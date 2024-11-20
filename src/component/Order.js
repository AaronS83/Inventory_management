import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function Order() {
    const { pid } = useParams();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const result = await axios.get(`http://localhost:8800/orders/${pid}`);
                console.log(result.data);
                setOrders(result.data);
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        fetchOrders();
    }, [pid])

    const formatDate = (DateInfo)=>{
        const date = new Date(DateInfo);
        return date.toLocaleDateString('en-GB');
    }   

    return (
        <>
            <div className="container">
            {loading ? (<h4>Loading</h4>) : (<h4> Sale summary for the product {orders[0].pname} that cost {orders[0].price}</h4>)}
            {orders.length > 0 ?
                (
                    orders.map((order) => {
                        return (
                            <div className="card my-4" key={order.sale_id} style={{width: "18rem"}}>
                                <div className="card-body">
                                    <h5 className="card-title">Sale ID = {order.sale_id}</h5>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">{formatDate(order.sale_date)}</h6>
                                    <p className="card-text">Sale quantity - {order.sold_quantity}</p>
                                    <p className="card-text">Total earning for this sale - {order.total_price}</p>
                                    
                                </div>
                            </div>
                        )
                    })
                ) :
                (<p>No orders</p>)
            }
            </div>
        </>
    )
}

export default Order;