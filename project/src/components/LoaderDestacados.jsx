import { ClipLoader } from "react-spinners";
import '../styles/LoaderDestacados.css'

function LoaderDestacados() {
  return (
    <div className="clipLoaderContianerDestacados">
      <ClipLoader
        color="#000"
        size={80}
        aria-label="Loading..."
        data-testid="loader"
      />
      <span>Cargando productos destacados...</span>
    </div>
  );
}

export default LoaderDestacados;
