import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
            }
        };
        fetchAnalysis();
    }, [pid]);

    // Check if result is still loading or if pname is available
    if (loading) {
        return <p>Loading...</p>;
    }

    // Safely access result.pname and other properties
    const pname = result.pname?.pname || 'Unknown Product'; // Default to 'Unknown Product' if pname is not available
    const order = result.order || {};
    const sale = result.sale || {};

    return (
        <div className="container">
            <h3>Summary of product - {pname}</h3>
            <div className="card my-4" style={{ width: "30rem" }}>
                <div className="card-body">
                    <h5 className="card-title">Supplier Order Summary</h5>
                    <p className="card-text">Number - {order.number || 'N/A'}</p>
                    <p className="card-text">Total Quantity bought - {order.quantity || 'N/A'}</p>
                    <p className="card-text">Max Quantity bought in one sale - {order.total || 'N/A'}</p>
                </div>
            </div>

            <div className="card" style={{ width: "30rem" }}>
                <div className="card-body">
                    <h5 className="card-title">Consumer Order Summary</h5>
                    <p className="card-text">Number - {sale.number || 'N/A'}</p>
                    <p className="card-text">Total Quantity bought - {sale.quantity || 'N/A'}</p>
                    <p className="card-text">Max Quantity bought in one sale - {sale.total || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
}

export default Analysis;
