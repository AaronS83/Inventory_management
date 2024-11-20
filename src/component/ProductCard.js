import { formatCurrency } from "../utils/formatters";
import {Link} from "react-router-dom";
function ProductCard(props) {
    const product = props.product;
    return (
        <div className="card my-4" style={{ width: '27rem' }}>
            <div className="card-body">
                <h5 className="card-title">{product.pid}. {product.pname}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Cost - {formatCurrency(product.price)}</h6>
                <p className="card-text">{product.description}</p>
                <Link to={`/inventory/${product.pid}`} className="btn btn-primary">View Inventory</Link>
                <Link to={`/analysis/${product.pid}`} className="btn btn-secondary mx-5">Analysis of Product</Link>
            </div>
        </div>
    );
}

export default ProductCard;
