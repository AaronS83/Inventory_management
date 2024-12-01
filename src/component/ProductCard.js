import { formatCurrency } from "../utils/formatters";
import { Link } from "react-router-dom";
import "./css/ProductCard.css"
function ProductCard(props) {
    const product = props.product;

    return (
        <div className="card my-4" style={{ width: '100%', maxWidth: '27rem' }}>
            {/* <img 
                src={product.imageUrl || "/default-image.jpg"} 
                className="card-img-top" 
                alt={product.pname} 
                style={{ height: '200px', objectFit: 'cover' }}
            /> */}
            <div className="card-body">
                <h5 className="card-title">{product.pid}. {product.pname}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Cost - {formatCurrency(product.price)}</h6>
                <p className="card-text">{product.description}</p>
                
                <div className="d-flex justify-content-between">
                    <Link to={`/inventory/${product.pid}`} className="btn btn-primary">View Inventory</Link>
                    <Link to={`/analysis/${product.pid}`} className="btn btn-secondary">Analysis of Product</Link>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
