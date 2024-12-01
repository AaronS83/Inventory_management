import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./css/Analysis.css"

function Analysis() {
    const { pid } = useParams();
    const [result, setResult] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/analysis/${pid}`);
                setResult(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false); // Stop loading even on error
            }
        };
        fetchAnalysis();
    }, [pid]);

    // Check if result is still loading or if pname is available
    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <h4 className="mt-3">Loading product analysis...</h4>
            </div>
        );
    }

    // Safely access result.pname and other properties
    const pname = result.pname?.pname || 'Unknown Product'; // Default to 'Unknown Product' if pname is not available
    const order = result.order || {};
    const sale = result.sale || {};

    return (
        <div className="container my-5">
            <h3 className="text-center mb-4">Summary of Product - {pname}</h3>

            {/* Supplier Order Summary Card */}
            <div className="card shadow-sm mb-4" style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
                <div className="card-body">
                    <h5 className="card-title">Supplier Order Summary</h5>
                    <p className="card-text"><strong>Number:</strong> {order.number || 'N/A'}</p>
                    <p className="card-text"><strong>Total Quantity Bought:</strong> {order.quantity || 'N/A'}</p>
                    <p className="card-text"><strong>Max Quantity Bought in One Sale:</strong> {order.total || 'N/A'}</p>
                </div>
            </div>

            {/* Consumer Order Summary Card */}
            <div className="card shadow-sm" style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
                <div className="card-body">
                    <h5 className="card-title">Consumer Order Summary</h5>
                    <p className="card-text"><strong>Number:</strong> {sale.number || 'N/A'}</p>
                    <p className="card-text"><strong>Total Quantity Bought:</strong> {sale.quantity || 'N/A'}</p>
                    <p className="card-text"><strong>Max Quantity Bought in One Sale:</strong> {sale.total || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
}

export default Analysis;
