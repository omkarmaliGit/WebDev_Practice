const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();
const filePath = path.join(__dirname, "products.json");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: "public/images/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Helper functions to load and save products
function loadProducts() {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath));
  }
  return [];
}

function saveProducts(products) {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
}

// Routes

// Get all products
app.get("/products", (req, res) => {
  const products = loadProducts();
  res.json(products);
});

// Add a new product
app.post("/products", upload.single("image"), (req, res) => {
  const products = loadProducts();
  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    description: req.body.description,
    image: `/images/${req.file.filename}`,
  };
  products.push(newProduct);
  saveProducts(products);
  res.json({ success: true });
});

// Get a single product by ID
app.get("/products/:id", (req, res) => {
  const products = loadProducts();
  const product = products.find((p) => p.id === parseInt(req.params.id, 10));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// Update a product
app.put("/products/:id", (req, res) => {
  const products = loadProducts();
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    saveProducts(products);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// Delete a product
app.delete("/products/:id", (req, res) => {
  let products = loadProducts();
  const productId = parseInt(req.params.id);
  products = products.filter((p) => p.id !== productId);
  saveProducts(products);
  res.json({ success: true });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
