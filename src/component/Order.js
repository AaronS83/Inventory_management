import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./css/Order.css";

function Order() {
    const { pid } = useParams();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // For error handling

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const result = await axios.get(`http://localhost:8800/sales/${pid}`);
                setOrders(result.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to load sales data.");
                console.error(error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [pid]);

    const formatDate = (dateInfo) => {
        const date = new Date(dateInfo);
        return date.toLocaleDateString('en-GB');
    };

    return (
        <div className="container my-5">
            {loading ? (
                <div className="text-center">
                    <h4>Loading sales data...</h4>
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            ) : (
                <>
                    <h4 className="mb-4">
                        Sale summary for product: <strong>{orders[0].pname}</strong> (Price: <strong>{orders[0].price}</strong>)
                    </h4>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div className="card my-4" key={order.sale_id} style={{ width: "18rem" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Sale ID: {order.sale_id}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{formatDate(order.sale_date)}</h6>
                                    <p className="card-text">Sold Quantity: {order.sold_quantity}</p>
                                    <p className="card-text">Total Earnings: {order.total_price}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No orders found for this product.</p>
                    )}
                </>
            )}
        </div>
    );
}

export default Order;
