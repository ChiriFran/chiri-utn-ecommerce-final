import { Link } from "react-router-dom";
import "../styles/Item.css";

const Item = ({ producto }) => {
  return (
    <div className="item">
      <img src={producto.image} alt={producto.title} className="itemImg"></img>
      <h1 className="itemTitle">
        {producto.title} ({producto.id})
      </h1>
      <h4 className="itemCategory">{producto.category}</h4>
      <h2 className="itemDescription">
        Descripcion: <br></br>
        {producto.description.slice(0, 50)}
      </h2>
      <h3 className="itemPrice">Price: ${producto.price}</h3>{" "}
      <Link
        to={`/ProductoDetalles/${producto.id}`}
        className="ver-mas itemButton"
      >
        Ver detalle
      </Link>
    </div>
  );
};

export default Item;
