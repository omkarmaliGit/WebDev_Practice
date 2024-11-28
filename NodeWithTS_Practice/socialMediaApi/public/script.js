document.addEventListener("DOMContentLoaded", () => {
  // Add event listeners for login and registration forms
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegistration);
  }

  const authButton = document.getElementById("auth-button");
  const mainContent = document.getElementById("main-content");

  // Display correct button text
  authButton.textContent = isLoggedIn() ? "Logout" : "Login";

  // Display content based on authentication state
  if (mainContent) {
    if (isLoggedIn()) {
      fetchPosts(mainContent);
    } else {
      mainContent.innerHTML =
        "<h2>Welcome to My Social Media</h2><p>Please log in to see posts.</p>";
    }
  }

  // Handle login/logout button click
  authButton.addEventListener("click", handleAuthClick);
});

// Redirect based on login state
function handleAuthClick() {
  if (isLoggedIn()) {
    logoutUser();
  } else {
    window.location.href = "login.html";
  }
}

// Handle Login
async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Login successful!");
      localStorage.setItem("user", JSON.stringify({ email, password })); // Save user data
      window.location.href = "index.html";
    } else {
      alert(result.message || "Login failed!");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
}

// Handle Registration
async function handleRegistration(event) {
  event.preventDefault();
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  try {
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Registration successful! Please log in.");
      window.location.href = "login.html";
    } else {
      alert(result.message || "Registration failed!");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
}

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem("user") !== null;
}

// Logout user
function logoutUser() {
  localStorage.removeItem("user");
  alert("You have been logged out.");
  window.location.href = "index.html";
}

// Fetch and display posts from backend
async function fetchPosts(container) {
  try {
    const user = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage

    // If the user is logged in, send the authorization header with the request
    const authHeader = user
      ? `Basic ${btoa(user.email + ":" + user.password)}`
      : "";

    const response = await fetch("/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader, // Add Authorization header here
      },
    });

    const rawResponse = await response.text(); // Get raw text from the response
    console.log("Raw response:", rawResponse); // Log the raw response

    // Try to parse the response as JSON
    const posts = JSON.parse(rawResponse);

    // const posts = await response.json();

    // Check if posts is an array
    if (!Array.isArray(posts)) {
      console.error("Expected an array but got:", posts);
      container.innerHTML = "<p>Failed to load posts. Invalid data format.</p>";
      return;
    }

    container.innerHTML = "<h2>Recent Posts</h2>";
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post";
      postElement.innerHTML = `
              <div class="post-header">
                  <span>${post.user}</span>
                  <span>${new Date(post.createdAt).toLocaleString()}</span>
              </div>
              <p>${post.content}</p>
              <button onclick="likePost('${post.id}')">Like</button>
          `;
      container.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    container.innerHTML =
      "<p>Failed to load posts. Please try again later.</p>";
  }
}

// Handle liking a post
async function likePost(postId) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const authHeader = user
      ? `Basic ${btoa(user.email + ":" + user.password)}`
      : "";

    const response = await fetch(`/posts/${postId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader, // Include the Authorization header
      },
    });

    const result = await response.json();
    if (response.ok) {
      alert("Post liked successfully!");
      window.location.reload(); // Reload to update likes
    } else {
      alert(result.message || "Failed to like post.");
    }
  } catch (error) {
    console.error("Error liking post:", error);
    alert("An error occurred. Please try again.");
  }
}
