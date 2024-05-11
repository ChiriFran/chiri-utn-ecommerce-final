import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import ItemListContainer from "./components/ItemListContainer.jsx";
import Nosotros from "./components/Nosotros.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer.jsx";
import Navbar from "./components/Navbar.jsx";
import LogIn from "./components/LogIn.jsx";
import SignUp from "./components/SingUp.jsx";
import Carrito from "./components/Carrito.jsx";
import Checkout from "./components/Checkout.jsx";
import { CartProvider } from "./context/CartContext.jsx";

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Productos" element={<ItemListContainer />} />
            <Route
              path="/Productos/:category"
              element={<ItemListContainer />}
            />
            <Route
              path="/ProductoDetalles/:id"
              element={<ItemDetailContainer />}
            />
            <Route path="/Nosotros" element={<Nosotros />} />
            <Route path="*" element={<p>Not Found</p>} />
            <Route path="/LogIn" element={<LogIn />} />
            <Route path="/SingUp" element={<SignUp />} />

            <Route path="/Carrito" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
