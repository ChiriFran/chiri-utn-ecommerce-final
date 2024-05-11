import "../styles/SingUp.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, createUserWithEmailAndPassword } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Guardar datos adicionales del usuario en Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
      });

      // Manejar redirección o cualquier otra acción después del registro
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <section className="SignUpFormContainer">
        <section className="SignUpForm">
          <div className="form-box">
            <form className="form" onSubmit={handleSignUp}>
              <span className="title">Sign up</span>
              <span className="subtitle">
                Create a free account with your email.
              </span>
              <div className="form-container">
                <input
                  type="text"
                  className="input"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
                <input
                  type="text"
                  className="input"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
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
                <button type="submit">Sign up</button>
              </div>
            </form>
            {error && <p>{error}</p>}
            <div className="form-section">
              <p>
                Have an account? <Link to="/LogIn">Log In</Link> or{" "}
                <Link to="/">Go Home</Link>
              </p>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default SignUp;
