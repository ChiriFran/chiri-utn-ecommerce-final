import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { useParams } from "react-router-dom";

import ItemList from "./ItemList";
import Loader from "./Loader";

import "../styles/ItemListContainer.css";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [titulo, setTitulo] = useState("Todos los productos");
  const [isLoading, setIsLoading] = useState(true);
  const category = useParams().category;

  // Función para convertir la primera letra en mayúscula
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    setIsLoading(true);
    const productosDb = collection(db, "productos");
    const q = category
      ? query(productosDb, where("category", "==", category))
      : productosDb;

    getDocs(q).then((resp) => {
      setProductos(
        resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
      setIsLoading(false);

      // Actualiza el título basado en la categoría seleccionada
      if (category) {
        setTitulo(capitalizeFirstLetter(category));
      } else {
        setTitulo("Todos los productos");
      }
    });
  }, [category]);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="productosContainer">
        <ItemList productos={productos} titulo={titulo} />
      </div>
    </>
  );
};

export default ItemListContainer;
