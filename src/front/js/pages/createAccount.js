import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const CreateAccount = () => {
  const { store, actions } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const signupHandler = (e) => {
    e.preventDefault();

    const BASE_URL = "https://k00pa121-orange-doodle-rjv6jj9vp4x3pgv5-3001.preview.app.github.dev";

    if (!email || !password) {
      console.log("Debes llenar todos los campos");
      return;
    }

    fetch(`${BASE_URL}/api/users/signup`, {
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
        if (data.message === "Sesión Inciada") {
          setMessage("Usuario creado exitosamente");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setMessage("No se pudo crear el usuario");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="row bg-dark">
        <form onSubmit={signupHandler}>
          <div className="col-12 my-2 d-flex justify-content-center">
            <h1 className="text-light">Crear una cuenta</h1>
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
            <button type="submit" className="btn btn-primary">Crear Cuenta</button>
          </div>
          <div className="col-12 my-2 d-flex justify-content-center">
            <Link to="/">Ya tengo una cuenta</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
