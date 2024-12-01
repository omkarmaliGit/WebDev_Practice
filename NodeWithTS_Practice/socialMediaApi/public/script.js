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

  // Handle login/logout button click
  authButton.textContent = isLoggedIn() ? "Logout" : "Login";
  authButton.addEventListener("click", handleAuthClick);

  // Display appropriate content based on authentication state
  if (mainContent) {
    if (isLoggedIn()) {
      displayNavigation(); // Show nav and content
    } else {
      mainContent.innerHTML =
        "<h2>Welcome to My Social Media</h2><p>Please log in to see posts.</p>";
    }
  }
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
      localStorage.setItem(
        "user",
        JSON.stringify({ email, password, userId: result.userId })
      );
      // Save user data
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

// Display navigation bar and initialize content
function displayNavigation() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = `
    <nav class="nav-buttons">
      <button id="feed-btn" class="active">Feed</button>
      <button id="my-posts-btn">My Posts</button>
    </nav>
    <div id="content-section"></div>
  `;

  // Add event listeners to navigation buttons
  document
    .getElementById("feed-btn")
    .addEventListener("click", () => displayFeed());
  document
    .getElementById("my-posts-btn")
    .addEventListener("click", () => displayMyPosts());

  // Display feed by default
  displayFeed();
}

// Fetch and display feed posts
async function displayFeed() {
  const container = document.getElementById("content-section");
  container.innerHTML = "";

  const posts = await fetchPosts(false);
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `
      <div class="post-header">
        <span>User ID : ${post.userId}</span>
        <span>${post.createdAt}</span>
      </div>
      <p>${post.content}</p>
      <button onclick="likePost(${post.id})">${post.likes.length} Likes</button>
    `;
    container.appendChild(postElement);
  });

  const feedBtn = document.getElementById("feed-btn");
  feedBtn.className = "active";
  const myPostsBtn = document.getElementById("my-posts-btn");
  feedBtn.className = "";
}

// Fetch and display user-specific posts
async function displayMyPosts() {
  const container = document.getElementById("content-section");
  container.innerHTML = `
    <!-- <h2>My Posts</h2> -->
    <form id="create-post-form">
      <textarea id="post-content" placeholder="Write something..." required></textarea>
      <button type="submit">Create Post</button>
    </form>
    <div id="my-posts-list"></div>
  `;

  // Handle post creation
  document
    .getElementById("create-post-form")
    .addEventListener("submit", createPost);

  // Fetch and show user's posts
  const posts = await fetchPosts(true);
  const myPostsContainer = document.getElementById("my-posts-list");

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `
      <p>${post.userId}</p>
      <p>${post.content}</p>
      <button onclick="editPost(${post.id})">Edit</button>
      <button onclick="deletePost(${post.id})">Delete</button>
    `;
    myPostsContainer.appendChild(postElement);
  });
}

// Fetch posts from the backend (filtered if needed)
async function fetchPosts(userOnly) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.userId) {
      alert("User information not found. Please log in again.");
      return [];
    }

    const authHeader = user
      ? `Basic ${btoa(user.email + ":" + user.password)}`
      : "";

    const response = await fetch("/posts", {
      headers: { Authorization: authHeader },
    });

    const posts = await response.json();

    if (userOnly && user.userId) {
      return posts.filter((post) => post.userId === user.userId);
    } else {
      return posts;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// Create a new post
async function createPost(event) {
  event.preventDefault();
  const content = document.getElementById("post-content").value;
  const user = JSON.parse(localStorage.getItem("user"));
  const authHeader = `Basic ${btoa(user.email + ":" + user.password)}`;

  try {
    const response = await fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({ content }),
    });

    if (response.ok) {
      alert("Post created successfully!");
      displayMyPosts(); // Refresh the user's posts
    } else {
      alert("Failed to create post.");
    }
  } catch (error) {
    console.error("Error creating post:", error);
    alert("An error occurred. Please try again.");
  }
}

// Add backend interaction for like, edit, and delete functions later
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
