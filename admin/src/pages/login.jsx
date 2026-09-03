import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {

    e.preventDefault();

    try {

      const res = await api.post("/admin/login", {
        email,
        password,
      });

      localStorage.setItem(
        "admin",
        JSON.stringify(res.data.admin)
      );

      navigate("/dashboard");

    } catch (err) {

      alert("Invalid Email or Password");

    }

  };

  return (

    <div className="login">

      <form onSubmit={login}>

        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );

}