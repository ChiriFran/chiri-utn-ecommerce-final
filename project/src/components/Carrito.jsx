import { useContext } from "react";
import "../styles/Carrito.css";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import ItemListContainerDestacados from "./ItemListContainerDestacados";

const Carrito = () => {
  const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);

  const handleVaciar = () => {
    vaciarCarrito();
  };

  return (
    <div className="carritoContainer">
      <h1 className="carritoTitle">Carrito vacio</h1>
      {carrito.length > 0 ? (
        <>
          {carrito.map((prod) => (
            <div className="carritoItem" key={prod.id}>
              <h2 className="titulo">{prod.title}</h2>
              <h3 className="cantidad">Cantidad: {prod.cantidad} unidad</h3>
              <h3 className="precio">Precio: ${prod.price}</h3>
              <h2 className="precioTotal">
                Total: $ {prod.price * prod.cantidad}
              </h2>
            </div>
          ))}
          <h2 className="precioFinal">Precio final: ${precioTotal()}</h2>
          <div className="buttonContainer">
            <Link className="finalizarCompra" to="/Checkout">Finalizar Compra</Link>
            <button onClick={handleVaciar} className="vaciarCarrito">
              Vaciar Carrito
            </button>
          </div>
        </>
      ) : (
        <ItemListContainerDestacados />
      )}
    </div>
  );
};

export default Carrito;
