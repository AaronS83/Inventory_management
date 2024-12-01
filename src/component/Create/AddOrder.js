import { useState } from "react";
import axios from "axios";
import '../css/AddOrder.css';  // Custom CSS for additional styling

function AddOrder() {
    const [orderDate, setOrderDate] = useState('');
    const [pID, setPID] = useState('');
    const [quantityOrdered, setQuantityOrdered] = useState('');
    const [supplierID, setSupplierID] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!orderDate || !pID || !quantityOrdered || !supplierID || !orderStatus) {
            setErrorMessage("All fields are required.");
            return;
        }

        const currentDate = new Date().toISOString().split('T')[0];
        const finalSaleDate = orderDate || currentDate;
        const finalQuantity = parseInt(quantityOrdered, 10);

        const orderData = {
            orderDate: finalSaleDate,
            pID,
            quantityOrdered: finalQuantity,
            supplierID,
            orderStatus
        };

        try {
            setLoading(true);
            const result = await axios.post('http://localhost:8800/add/addOrder', orderData);
            console.log("Order successfully added:", result.data);
            alert("Order successfully added!");
            setLoading(false);
        } catch (error) {
            console.error("Error adding order:", error.response?.data);
            setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        setOrderStatus(event.target.value);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Add a New Order</h2>

            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="OrderDate" className="form-label">Enter Date of Order</label>
                    <input
                        type="date"
                        className="form-control rounded-pill"
                        id="OrderDate"
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="pID" className="form-label">Enter Product ID</label>
                    <input
                        type="number"
                        className="form-control rounded-pill"
                        id="pID"
                        value={pID}
                        onChange={(e) => setPID(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="quantityOrdered" className="form-label">Enter Order Quantity</label>
                    <input
                        type="number"
                        className="form-control rounded-pill"
                        id="quantityOrdered"
                        value={quantityOrdered}
                        onChange={(e) => setQuantityOrdered(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="supplierID" className="form-label">Enter Supplier ID</label>
                    <input
                        type="number"
                        className="form-control rounded-pill"
                        id="supplierID"
                        value={supplierID}
                        onChange={(e) => setSupplierID(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="options" className="form-label">Choose The Order Status:</label>
                    <select
                        className="form-select rounded-pill"
                        id="options"
                        value={orderStatus}
                        onChange={handleChange}
                    >
                        <option value="">--Select an option--</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>

                <div className="d-grid gap-2">
                    <button
                        type="submit"
                        className="btn btn-primary rounded-pill"
                        disabled={loading || !orderDate || !pID || !quantityOrdered || !supplierID || !orderStatus}
                    >
                        {loading ? "Submitting..." : "Submit Details"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddOrder;
