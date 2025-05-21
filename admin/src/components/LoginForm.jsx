import React, { useState } from "react";
import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("jwt"); // or "basic"
  const [error, setError] = useState("");
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (mode === "jwt") {
        const res = await apiRequest({ action: "login" }, "POST", { username, password });
        login({ token: res.token, username, password, type: "jwt" });
      } else {
        login({ username, password, type: "basic" });
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Admin Login</h2>
      <div>
        <label>Username:<br/>
          <input value={username} onChange={e => setUsername(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>Password:<br/>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          <input type="radio" checked={mode === "jwt"} onChange={() => setMode("jwt")} />
          JWT Login
        </label>
        <label>
          <input type="radio" checked={mode === "basic"} onChange={() => setMode("basic")} />
          Basic Auth
        </label>
      </div>
      <button type="submit">Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}