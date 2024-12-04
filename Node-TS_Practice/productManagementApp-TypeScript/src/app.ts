import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import multer, { FileFilterCallback } from "multer";

const app = express();
const filePath = path.join(__dirname, "products.json");

// Ensure public/images directory exists
const imagesDir = path.join(__dirname,"..", "public", "images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"..", "public")));

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname,"..", "public", "images"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Helper functions to load and save products
function loadProducts(): Array<{ id: number; name: string; description: string; image: string }> {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }
  return [];
}

function saveProducts(products: Array<{ id: number; name: string; description: string; image: string }>): void {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
}

// Routes
// Get all products
app.get("/products", (req: Request, res: Response) => {
  try {
    const products = loadProducts();
    res.json(products);
  } catch (err) {
    console.error("Error loading products:", err);
    res.status(500).json({ error: "Failed to load products" });
  }
});

// Add a new product
app.post("/products", upload.single("image"), (req: Request, res: Response) => {
  try {
    const products = loadProducts();
    const newProduct = {
      id: Date.now(),
      name: req.body.name,
      description: req.body.description,
      image: `/images/${(req.file as Express.Multer.File).filename}`,
    };
    products.push(newProduct);
    saveProducts(products);
    res.json({ success: true });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// Get a single product by ID
app.get("/products/:id", (req: Request, res: Response) => {
  try {
    const products = loadProducts();
    const product = products.find((p) => p.id === parseInt(req.params.id, 10));
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Update a product
app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const products = loadProducts();
    const product = products.find((p) => p.id === parseInt(req.params.id, 10));
    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      saveProducts(products);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete a product
app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    let products = loadProducts();
    const productId = parseInt(req.params.id, 10);
    products = products.filter((p) => p.id !== productId);
    saveProducts(products);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
