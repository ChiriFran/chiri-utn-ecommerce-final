import { useState } from "react";
import '../styles/SearchFilters.css'

const SearchFilters = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    onSearch({ title: searchTerm, category: category.toLowerCase() });
  };

  return (
    <div className="search-filters">
      <input
        className="barraBusqueda"
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select className="categorySelect" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Todas las categorías</option>
        <option value="Men's Clothing">Men's Clothing</option>
        <option value="Women's Clothing">Women's Clothing</option>
        <option value="Jewelery">Jewelery</option>
        <option value="Electronics">Electronics</option>
      </select>
      <button className="btnBuscar" onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchFilters;
