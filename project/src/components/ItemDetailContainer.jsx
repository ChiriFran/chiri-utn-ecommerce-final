import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import ItemDetail from "./ItemDetail";
import Loader from "./Loader";
import "../styles/ItemDetailContainer.css";
import "../styles/Item.css";

const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const id = useParams().id;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchItem = async () => {
      try {
        const docDb = doc(db, "productos", id);
        const docSnapshot = await getDoc(docDb);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const itemWithStock = {
            ...data,
            id: docSnapshot.id,
            stock: data.stock || 10,
          };
          setItem(itemWithStock);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          console.log("No existe el documento con el ID proporcionado");
          alert("No existe el documento con el ID proporcionado")
        }
      } catch (error) {
        setIsLoading(false);
        alert.error("Error obteniendo el documento:", error);
      }
    };

    fetchItem();
  }, [id]);

  if (isLoading) return <Loader />;

  return (
    <div className="detailContainer">{item && <ItemDetail item={item} />}</div>
  );
};

export default ItemDetailContainer;
