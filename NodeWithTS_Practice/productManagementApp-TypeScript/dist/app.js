"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
const filePath = path_1.default.join(__dirname, "products.json");
// Ensure public/images directory exists
const imagesDir = path_1.default.join(__dirname, "public", "images");
if (!fs_1.default.existsSync(imagesDir)) {
    fs_1.default.mkdirSync(imagesDir, { recursive: true });
}
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Configure Multer for image uploads
const storage = multer_1.default.diskStorage({
    destination: "public/images/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
// Helper functions to load and save products
function loadProducts() {
    if (fs_1.default.existsSync(filePath)) {
        return JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
    }
    return [];
}
function saveProducts(products) {
    fs_1.default.writeFileSync(filePath, JSON.stringify(products, null, 2));
}
// Routes
// Get all products
app.get("/products", (req, res) => {
    try {
        const products = loadProducts();
        res.json(products);
    }
    catch (err) {
        console.error("Error loading products:", err);
        res.status(500).json({ error: "Failed to load products" });
    }
});
// Add a new product
app.post("/products", upload.single("image"), (req, res) => {
    try {
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
    }
    catch (err) {
        console.error("Error adding product:", err);
        res.status(500).json({ error: "Failed to add product" });
    }
});
// Get a single product by ID
app.get("/products/:id", (req, res) => {
    try {
        const products = loadProducts();
        const product = products.find((p) => p.id === parseInt(req.params.id, 10));
        if (product) {
            res.json(product);
        }
        else {
            res.status(404).json({ error: "Product not found" });
        }
    }
    catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ error: "Failed to fetch product" });
    }
});
// Update a product
app.put("/products/:id", (req, res) => {
    try {
        const products = loadProducts();
        const product = products.find((p) => p.id === parseInt(req.params.id, 10));
        if (product) {
            product.name = req.body.name || product.name;
            product.description = req.body.description || product.description;
            saveProducts(products);
            res.json({ success: true });
        }
        else {
            res.status(404).json({ error: "Product not found" });
        }
    }
    catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ error: "Failed to update product" });
    }
});
// Delete a product
app.delete("/products/:id", (req, res) => {
    try {
        let products = loadProducts();
        const productId = parseInt(req.params.id, 10);
        products = products.filter((p) => p.id !== productId);
        saveProducts(products);
        res.json({ success: true });
    }
    catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ error: "Failed to delete product" });
    }
});
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
