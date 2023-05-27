import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const LogIn = () => {
  const { actions } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();

    const BASE_URL = "https://k00pa121-orange-doodle-rjv6jj9vp4x3pgv5-3001.preview.app.github.dev";

    fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log("Error:", data.error);
        } else if (data.access_token) {
          console.log("Login successful");
          localStorage.setItem("user", email);
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          setTimeout(() => {
            history.push("/private");
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Server error:", error);
      });
  };

  return (
    <div className="container">
      <div className="row bg-dark">
        <form onSubmit={loginHandler}>
          <div className="col-12 my-2 d-flex justify-content-center">
            <h1 className="text-light">Iniciar Sesión</h1>
          </div>
          <div className="col-12 my-2 d-flex justify-content-center">
            <input
              placeholder="email@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-12 my-2 d-flex justify-content-center">
            <input
              placeholder="contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-12 my-2 d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Iniciar Sesión
            </button>
          </div>
          <div className="col-12 my-2 d-flex justify-content-center">
            <Link to="/createAccount">Crear una cuenta</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
