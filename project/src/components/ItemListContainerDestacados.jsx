import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import ItemListDestacados from "./ItemListDestacados";
import LoaderDestacados from "./LoaderDestacados";

const ItemListContainerDestacados = () => {
  const [productos, setProductos] = useState([]);
  const category = useParams().category;
  const [isLoadingDestacados, setIsLoadingDestacados] = useState(true);

  useEffect(() => {
    const productosDb = collection(db, "productos");
    let filtroCategoria;
    if (category) {
      filtroCategoria = query(productosDb, where("category", "==", category));
    } else {
      filtroCategoria = productosDb;
    }
    setIsLoadingDestacados(true);

    getDocs(filtroCategoria).then((res) => {
      setIsLoadingDestacados(false);
      // Obtener 4 productos aleatorios
      const randomProductos = [];
      const max = res.docs.length;
      const indices = new Set();
      while (indices.size < 4) {
        const index = Math.floor(Math.random() * max);
        if (!indices.has(index)) {
          indices.add(index);
          randomProductos.push({
            ...res.docs[index].data(),
            id: res.docs[index].id,
          });
        }
      }
      setProductos(randomProductos);
    });
  }, [category]);

  if (isLoadingDestacados) return <LoaderDestacados />;

  return (
    <>
      <ItemListDestacados productos={productos} />
    </>
  );
};

export default ItemListContainerDestacados;
