import '../styles/ItemCount.css'

const ItemCount = ( {cantidad, handleSumar, handleRestar, handleAgregar} ) => {

  return (
    <div>
      <div className="itemCount">
        <button className='btnContador' onClick={handleRestar}>-</button>
        <p className='cantidad'>{cantidad}</p>
        <button className='btnContador' onClick={handleSumar}>+</button>
      </div>
      <button className="agregar-al-carrito" onClick={handleAgregar}>Agregar al carrito</button>
    </div>
  );
};

export default ItemCount;
