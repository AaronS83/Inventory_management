import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Sales() {
    const { pid } = useParams();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchSales = async () => {
            try {
                const result = await axios.get(`http://localhost:8800/sales/${pid}`);
                setSales(result.data);
                console.log(result.data);
                // console.log(sales)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchSales();
    }, [pid])

    const formatDate = (dateString) => {
        const date = new Date(dateString);  
        return date.toLocaleDateString('en-GB');
    };

    return (
        <>
            <div className="container">

                {loading ? (
                    <h3>Loading...</h3>
                ) : (
                    <>
                    <h3>Product ID - {pid}</h3>
                    <h3>Product Name - {sales[0]?.pname}</h3>
                    </>
                )}


                {sales.length>0?
                (
                    sales.map((sale) => {
                        return (
                            <div className="card my-4" style={{ width: "18rem" }} key={sale.oid}>
                                <div className="card-body">
                                    <h5 className="card-title">Sale ID - {sale.oid}</h5>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">Order Date - {formatDate(sale.order_date)}</h6>
                                    <p className="card-text">Order Quantity - {sale.quantity_ordered}</p>
                                    <p className="card-text">Supplier ID - {sale.sid}</p>
                                    <p className="card-text">Status of the order - {sale.order_status}</p>
                                </div>
                            </div>
                        )
                    })
                )
                :
                    (<p>No sales info</p>)
                }

                
            </div>

        </>
    )
}
export default Sales;