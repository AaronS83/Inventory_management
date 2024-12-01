import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function UpdateOrder() {
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const onLoad = async () => {
            try {
                const allOrders = await axios.get('http://localhost:8800/orders');
                console.log(allOrders.data);
                setOrderData(allOrders.data);
            } catch (error) {
                console.log(error);
            }
        }
        onLoad();
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    return (
        <div className="container">
            <div className="row">
                {orderData.length > 0?(
                    orderData.map((order, index) => (
                        <div className="col-md-3 mb-4" key={index}>
                            <div className="card my-4" style={{ width: "18rem" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Order ID - {order.oid}</h5>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">Order Date - {formatDate(order.order_date)}</h6>
                                    <p className="card-text">Product Name - {order.pname}</p>
                                    <p className="card-text">Order Quantity - {order.quantity_ordered}</p>
                                    <p className="card-text">Supplier ID - {order.sid}</p>
                                    <p className="card-text">Status of the order - {order.order_status}</p>
                                    <Link to={`/orders/${order.oid}/edit`} className="btn btn-primary">Edit Order</Link>
                                </div>
                            </div>
                        </div>
                    ))
                )
            :(
                <p>No orders found</p>
            )}
            </div>
        </div>
    );
}

export default UpdateOrder;