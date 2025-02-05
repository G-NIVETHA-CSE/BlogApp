import { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();

    try {
      const response = await fetch("https://blogappbackend-tsas.onrender.com/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const { userInfo } = await response.json(); 
        setUserInfo(userInfo);
        alert("🎉 Login Successful! Welcome aboard! 🚀");
        setRedirect(true);
      } else {
        alert("❌ Invalid username or password! Please check again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("⚠️ Login failed. Please try again later.");
    }
  }

  if (redirect) {
    return <Navigate to="/header" />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login 🖥️</h1>
      <input
        type="text"
        placeholder="Username ✨"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password 🔒"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        required
      />
      <button type="submit" className="create-btn">Login 🔑</button>
      <div>
        <p>New to the platform? 🚀</p>
        <Link to="/register">
          <button type="button" className="create-btn">Create New Account 💫</button>
        </Link>
      </div>
    </form>
  );
}
