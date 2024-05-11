import { Link } from "react-router-dom";
import "../styles/ItemDestacados.css";

const ItemDestacados = ({ producto }) => {
  return (
    <div className="itemDestacados">
      <img src={producto.image} alt={producto.title} className="itemDestacadosImg"></img>
      <h4 className="itemDestacadosCategory">{producto.category}</h4>
      <h3 className="itemDestacadosPrice">Price: ${producto.price}</h3>{" "}
      <Link
        to={`/ProductoDetalles/${producto.id}`}
        className="ver-mas itemDestacadosButton"
      >
        Ver mas!
      </Link>
    </div>
  );
};

export default ItemDestacados;
