import React, { useState } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario ha iniciado sesión

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    document.body.classList.toggle("no-scroll");
  };

  const handleLogout = () => {
    // Realizar operaciones de cierre de sesión aquí
    setIsLoggedIn(false); // Actualizar el estado de inicio de sesión al cerrar sesión
  };

  return (
    <>
      <nav className={`nav ${showMenu ? "active" : ""}`}>
        <Link to="/" className="link">
          <h1 className="brand">Ecommerce</h1>
        </Link>

        <div
          className={`menuIcon ${showMenu ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <div className={`mobileMenu ${showMenu ? "active" : ""}`}>
          <div className="closeIcon" onClick={toggleMenu}>
            &#10005;
          </div>
          <ul className="navMenu">
            <li>
              <Link to="/" className="link" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/Productos" className="link" onClick={toggleMenu}>
                Tienda
              </Link>
            </li>
            <li>
              <Link
                to="/Productos/men's clothing"
                className="link"
                onClick={toggleMenu}
              >
                Men's Clothing
              </Link>
            </li>
            <li>
              <Link
                to="/Productos/women's clothing"
                className="link"
                onClick={toggleMenu}
              >
                Women's Clothing
              </Link>
            </li>
            <li>
              <Link
                to="/Productos/jewelery"
                className="link"
                onClick={toggleMenu}
              >
                Jewelery
              </Link>
            </li>
            <li>
              <Link
                to="/Productos/electronics"
                className="link"
                onClick={toggleMenu}
              >
                Electronics
              </Link>
            </li>
          </ul>

          <ul className="carritoContainer">
            <li>
              <Link to="/Carrito" className="link" onClick={toggleMenu}>
                Carrito
              </Link>
            </li>
          </ul>

          <ul className="userMenu">
            {isLoggedIn ? ( // Si el usuario ha iniciado sesión, solo muestra el enlace de "Log out"
              <li>
                <Link to={"/"} className="link" onClick={handleLogout}>
                  Log out
                </Link>
              </li>
            ) : (
              // Si el usuario no ha iniciado sesión, muestra los enlaces de "Log in" y "Sign up"
              <>
                <li>
                  <Link to={"/LogIn"} className="link" onClick={toggleMenu}>
                    Log in
                  </Link>
                </li>
                <li>
                  <Link to={"/SingUp"} className="link" onClick={toggleMenu}>
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <div className="navBarDesktopContainer">
        <ul className="userMenuDesktop">
          {isLoggedIn ? ( // Si el usuario ha iniciado sesión, solo muestra el enlace de "Log out"
            <li>
              <Link to={"/"} className="link" onClick={handleLogout}>
                Log out
              </Link>
            </li>
          ) : (
            // Si el usuario no ha iniciado sesión, muestra los enlaces de "Log in" y "Sign up"
            <>
              <li>
                <Link to={"/LogIn"} className="link">
                  Log in
                </Link>
              </li>
              <li>
                <Link to={"/SingUp"} className="link">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
        <ul className="navMenuDesktop">
          <li>
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/Productos" className="link">
              Tienda
            </Link>
          </li>
          <li>
            <Link to="/Productos/men's clothing" className="link">
              Men's Clothing
            </Link>
          </li>
          <li>
            <Link to="/Productos/women's clothing" className="link">
              Women's Clothing
            </Link>
          </li>
          <li>
            <Link to="/Productos/jewelery" className="link">
              Jewelery
            </Link>
          </li>
          <li>
            <Link to="/Productos/electronics" className="link">
              Electronics
            </Link>
          </li>
        </ul>
        <ul className="carritoContainerDesktop">
          <li>
            <Link to="/Carrito" className="link">
              Carrito
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
