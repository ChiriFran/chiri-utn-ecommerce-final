import "../styles/LogIn.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signOut } from "../firebase/config";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Comprobar si el usuario está autenticado al cargar el componente
  useEffect(() => {
    const storedUserEmail = localStorage.getItem("userEmail");
    const storedLoggedIn = localStorage.getItem("loggedIn") === "true";

    if (storedLoggedIn) {
      setLoggedIn(true);
      setUserEmail(storedUserEmail);
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        const userEmail = getCleanedEmail(user.email);
        setUserEmail(userEmail);
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("loggedIn", "true");
      } else {
        setLoggedIn(false);
        setUserEmail("");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("loggedIn");
      }
    });
    return unsubscribe;
  }, []);

  // Función para limpiar el email del usuario
  const getCleanedEmail = (email) => {
    const atIndex = email.indexOf("@");
    const cleanedEmail = email.slice(0, atIndex);
    return cleanedEmail;
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      const userEmail = user ? getCleanedEmail(user.email) : "Usuario";
      setLoggedIn(true);
      setUserEmail(userEmail);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("loggedIn", "true");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
      setUserEmail("");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("loggedIn");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      <section className="LogInFormContainer">
        <section className="LogInForm">
          <div className="form-box">
            {loggedIn ? (
              <div className="logedInContainer">
                <p className="logedInUser">Welcome {userEmail}</p>
                <p className="logedInTitle">You are logged in!</p>
                <button className="logedInButton" onClick={handleLogOut}>
                  Log out
                </button>
                <Link className="logedInButtonTienda" to="/Productos">
                  ¡Visitar Tienda!
                </Link>
              </div>
            ) : (
              <form className="form" onSubmit={handleLogIn}>
                <span className="title">{loggedIn ? "Log out" : "Log in"}</span>
                <span className="subtitle">Welcome back.</span>
                <div className="form-container">
                  <input
                    type="email"
                    className="input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  <button type="submit">
                    {loggedIn ? "Log out" : "Log in"}
                  </button>
                </div>
              </form>
            )}
            {error && <p>{error}</p>}
            <div className="form-section">
              <p>
                Don't have an account? <Link to="/SingUp">Sign Up</Link> or{" "}
                <Link to="/">Go Home</Link>
              </p>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default LogIn;
