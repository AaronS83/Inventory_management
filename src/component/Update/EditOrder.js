// EditOrder.js

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditOrder() {
    const { oid } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        orderDate: '',
        quantityOrdered: '',
        orderStatus: '',
        sid: ''
    });

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/orders/${oid}`);
                setOrder({
                    orderDate: response.data.order_date,
                    quantityOrdered: response.data.quantity_ordered,
                    orderStatus: response.data.order_status,
                    sid: response.data.sid
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchOrder();
    }, [oid]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedOrder = {
                ...order,
                oid,
            };
            const result = await axios.put(`http://localhost:8800/orders/${oid}`, updatedOrder);
            if (result.status === 200) {
                // Navigate only if the update is successful
                navigate('/orders');
            } else {
                alert("There is an issue with the order update.");
            }
        } catch (error) {
            // If the error response is available, show the error message
            if (error.response) {
                alert(error.response.data.message || "An error occurred while updating the order.");
            } else {
                // If no response, just show a generic error
                alert("Something went wrong. Please try again later.");
            }
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h2>Edit Order</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Order Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="orderDate"
                        value={order.orderDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Quantity Ordered</label>
                    <input
                        type="number"
                        className="form-control"
                        name="quantityOrdered"
                        value={order.quantityOrdered}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Order Status</label>
                    <input
                        type="text"
                        className="form-control"
                        name="orderStatus"
                        value={order.orderStatus}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Supplier ID</label>
                    <input
                        type="text"
                        className="form-control"
                        name="sid"
                        value={order.sid}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Order</button>
            </form>
        </div>
    );
}

export default EditOrder;
