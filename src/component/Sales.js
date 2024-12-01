import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './css/Sales.css';  // Import custom CSS

function Sales() {
    const { pid } = useParams();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const result = await axios.get(`http://localhost:8800/orders/${pid}`);
                setSales(result.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSales();
    }, [pid]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);  
        return date.toLocaleDateString('en-GB');
    };

    return (
        <div className="container my-5">
            {loading ? (
                <h3 className="text-center text-primary">Loading...</h3>
            ) : (
                <>
                    <h3 className="text-center text-primary mb-4">Product ID - {pid}</h3>
                    <h4 className="text-center mb-4">Product Name - {sales[0]?.pname}</h4>
                </>
            )}

            {sales.length > 0 ? (
                <div className="row">
                    {sales.map((sale) => (
                        <div className="col-md-4" key={sale.oid}>
                            <div className="card my-3 sale-card">
                                <div className="card-body">
                                    <h5 className="card-title">Sale ID - {sale.oid}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Order Date - {formatDate(sale.order_date)}</h6>
                                    <p className="card-text">Order Quantity - {sale.quantity_ordered}</p>
                                    <p className="card-text">Supplier ID - {sale.sid}</p>
                                    <p className="card-text">Status of the order - {sale.order_status}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No sales info</p>
            )}
        </div>
    );
}

export default Sales;
