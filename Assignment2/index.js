const express = require("express");

const app = express();

const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 799,
    stock: 25,
    rating: 4.3
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: 2499,
    stock: 40,
    rating: 4.5
  },
  {
    id: 3,
    name: "Laptop Stand",
    category: "Accessories",
    price: 999,
    stock: 30,
    rating: 4.2
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 12,
    rating: 4.4
  },
  {
    id: 5,
    name: "Backpack",
    category: "Fashion",
    price: 1599,
    stock: 50,
    rating: 4.1
  },
  {
    id: 6,
    name: "Lip Gloss",
    category: "Makeup",
    price: 453,
    stock: 82,
    rating: 3.7
  }
]


app.get("/products", (req, res) => {
  res.status(200).json(products)
});


app.get("/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find(p => p.id == productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});


app.get("/products/category/:categoryName", (req, res) => {
  const categoryName = req.params.categoryName.toLowerCase();
  const product = products.find(p => p.category.toLowerCase() == categoryName);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});


app.use(express.json());

app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    rating: req.body.rating
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product created",
    product: newProduct
  });
});


app.put("/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const index = products.findIndex(p => p.id == productId);

  if (index == -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products[index] = {
    id: productId,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    rating: req.body.rating
  };

  res.status(200).json({
    message: "Product replaced",
    product: products[index]
  });
});


app.patch("/products/:id/stock", (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find(p => p.id == productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (req.body.stock !== undefined) product.stock = req.body.stock;

  res.status(200).json({
    message: "Product stock updated",
    product
  });
});


app.patch("/products/:id/price", (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find(p => p.id == productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (req.body.price !== undefined) product.price = req.body.price;

  res.status(200).json({
    message: "Product price updated",
    product
  });
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});