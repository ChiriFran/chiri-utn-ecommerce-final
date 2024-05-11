import { Link } from "react-router-dom";
import "../styles/Home.css";
import ItemListContainerDestacados from "./ItemListContainerDestacados";

const Home = () => {
  return (
    <section className="homeContainer">
      <p className="homeText">
        ¡Descubre nuestro universo de <span>productos</span>! Sumérgete en un
        mundo lleno de opciones que satisfacen todos tus <span>gustos</span> y{" "}
        <span>necesidades</span>.
      </p>
      <Link to={`/Productos`} className="homeLink">
        Ver Productos!
      </Link>
      <h3 className="homeTitle">Productos destacados</h3>

      <ItemListContainerDestacados />
    </section>
  );
};

export default Home;
