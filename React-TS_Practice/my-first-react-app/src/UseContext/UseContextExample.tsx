import React, { createContext, useContext, useState } from "react";

// Create an Auth Context
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username) => setUser({ username });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav>
      {user ? (
        <>
          <span>Welcome, {user.username}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <span>Please log in</span>
      )}
    </nav>
  );
}

function LoginForm() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={() => login(username)}>Login</button>
    </div>
  );
}

function UseContextApp() {
  return (
    <AuthProvider>
      <h1>------------UseContext-----------</h1>
      <Navbar />
      <LoginForm />
    </AuthProvider>
  );
}

export default UseContextApp;
