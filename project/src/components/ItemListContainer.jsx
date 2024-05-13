import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { useParams } from "react-router-dom";

import ItemList from "./ItemList";
import Loader from "./Loader";
import SearchFilters from "./SearchFilters";

import "../styles/ItemListContainer.css";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [titulo, setTitulo] = useState("Todos los productos");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const { category: urlCategory } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const productosDb = collection(db, "productos");
    let q = productosDb;

    // Construir la consulta según los filtros aplicados
    if (searchTerm && category) {
      q = query(
        productosDb,
        where("title", "==", searchTerm),
        where("category", "==", category)
      );
    } else if (searchTerm) {
      q = query(productosDb, where("title", "==", searchTerm));
    } else if (category) {
      q = query(productosDb, where("category", "==", category));
    } else if (urlCategory) {
      q = query(productosDb, where("category", "==", urlCategory));
    }

    getDocs(q)
      .then((resp) => {
        setProductos(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsLoading(false);
        if (category) {
          setTitulo(capitalizeFirstLetter(category));
        } else if (urlCategory) {
          setTitulo(capitalizeFirstLetter(urlCategory));
        } else {
          setTitulo("Todos los productos");
        }
      })
      .catch((error) => {
        console.error("Error fetching documents: ", error);
        setIsLoading(false);
      });
  }, [searchTerm, category, urlCategory]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSearch = (searchFilters) => {
    setSearchTerm(searchFilters.title);
    setCategory(searchFilters.category);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <SearchFilters onSearch={handleSearch} />
      <div className="productosContainer">
        <ItemList productos={productos} titulo={titulo} />
      </div>
    </>
  );
};

export default ItemListContainer;
