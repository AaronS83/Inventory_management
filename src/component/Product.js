import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard"; // Assuming ProductCard is implemented correctly.
import "./css/Product.css"

function Product() {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Added error state

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await axios("http://localhost:8800/product");
                setProduct(result.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError("Failed to load product data.");
                setLoading(false);
            }
        };
        fetchProduct();
    }, []);

    return (
        <>
            {loading ? (
                <div className="text-center my-5">
                    <h4>Loading products...</h4>
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            ) : (
                <div className="container my-5">
                    <div className="row">
                        {product.length > 0 ? (
                            product.map((value) => (
                                <div className="col-md-4 mb-4" key={value.id}> {/* Use 'id' if possible */}
                                    <ProductCard product={value} />
                                </div>
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Product;
