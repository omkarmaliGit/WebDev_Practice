const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

let products = [];

const fetchProducts = async () => {
  const res = await fetch("/products");
  return await res.json();
};

const displayProducts = (products) => {
  const productListTbody = document.querySelector("#product-list tbody");
  productListTbody.innerHTML = products
    .map(
      (product) => `
        <tr class="product">
          <td><h3>${product.name}</h3></td>
          <td><img src="${product.image}" alt="${product.name}" /></td>
          <td>
          <button onclick="viewProduct(${product.id})">View Details</button>
          <button onclick="editProduct(${product.id})">Edit</button>
          <button onclick="deleteProduct(${product.id})">Delete</button>
          </td>
        </tr>
      `
    )
    .join("");
};

const filterProducts = () => {
  const searchInput = document.getElementById("search").value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchInput)
  );
  displayProducts(filteredProducts);
};

document
  .getElementById("search-button")
  .addEventListener("click", filterProducts);

const viewProduct = async (id) => {
  const res = await fetch(`/products/${id}`);
  const product = await res.json();

  document.getElementById("product-name").innerText = product.name;
  document.getElementById("product-description").innerText =
    product.description;
  document.getElementById("product-image").src = product.image;

  productList.style.display = "none";
  productDetails.style.display = "block";
};

document.getElementById("back-button").addEventListener("click", () => {
  productList.style.display = "block";
  productDetails.style.display = "none";
});

document
  .getElementById("add-product-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    if (form.dataset.editId) {
      const id = form.dataset.editId;
      await fetch(`/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          description: formData.get("description"),
        }),
      });
      showNotification("Product updated successfully!");
      form.dataset.editId = "";
    } else {
      await fetch("/products", { method: "POST", body: formData });
      showNotification("Product added successfully!");
    }

    form.reset();
    loadProducts();

    const submitBtn = document.getElementById("addProBtn");
    submitBtn.innerText = "Add Product";
  });

const editProduct = (id) => {
  const product = products.find((p) => p.id === id);

  if (product) {
    const submitBtn = document.getElementById("addProBtn");
    submitBtn.innerText = "Save Edited Product";

    const form = document.getElementById("add-product-form");
    form.name.value = product.name;
    form.description.value = product.description;
    form.dataset.editId = id;
  }
};

const deleteProduct = async (id) => {
  await fetch(`/products/${id}`, { method: "DELETE" });
  showNotification("Product deleted successfully!");
  products = products.filter((p) => p.id !== id);
  displayProducts(products);
};

const loadProducts = async () => {
  products = await fetchProducts();
  displayProducts(products);
};

loadProducts();

const showNotification = (message) => {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.display = "block";

  // Hide the notification after 3 seconds
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
};
