import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/Inventory.css"

function Inventory() {
    const { pid } = useParams();
    const [inventoryData, setInventoryData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`http://localhost:8800/inventory/${pid}`);
                setInventoryData(result.data);
                console.log(result.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [pid]);

    const fetchTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    return (
        <div className="container my-5">
            {inventoryData ? (
                <div className="d-flex justify-content-center">
                    <div className="card shadow-lg" style={{ width: "50rem" }}>
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4">{inventoryData.ProductName} - Inventory Details</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <u>Product ID</u>: <strong>{inventoryData.ProductID}</strong>
                                </li>
                                <li className="list-group-item">
                                    <u>Product Name</u>: <strong>{inventoryData.ProductName}</strong>
                                </li>
                                <li className="list-group-item">
                                    <u>Description</u>: <strong>{inventoryData.Description}</strong>
                                </li>
                                <li className="list-group-item">
                                    <u>Quantity in Inventory</u>: <strong>{inventoryData.InventoryQuantity}</strong>
                                </li>
                                <li className="list-group-item">
                                    <u>Order ID of Latest Order from Supplier</u>: <strong>{inventoryData.latestOrder.OrderID}</strong>
                                    <br />
                                    <Link to={`/sales/${pid}`} className="card-link">Supplier link</Link>
                                </li>
                                <li className="list-group-item">
                                    <u>Latest Order Date from Supplier</u>: <strong>{fetchTime(inventoryData.latestOrder.OrderDate)}</strong>
                                </li>
                                <li className="list-group-item">
                                    <u>Quantity Ordered from Supplier</u>: <strong>{inventoryData.latestOrder.OrderQuantity}</strong>
                                </li>
                                <li className="list-group-item">
                                    <u>Order Status from Supplier</u>: <strong>{inventoryData.latestOrder.OrderStatus}</strong>
                                </li>
                                <li className="list-group-item">
                                    <u>Price of Order</u>: <strong>{inventoryData.Price}</strong>
                                </li>
                                <li className="list-group-item">
                                    <u>Total Quantity Sold</u>: <strong>{inventoryData.sales.SoldQuantity}</strong>
                                    <br />
                                    <Link to={`/orders/${pid}`} className="card-link">Sales Link</Link>
                                </li>
                                <li className="list-group-item">
                                    <u>Total Revenue from Sales</u>: <strong>{inventoryData.sales.SaleTotalPrice}</strong>
                                </li>
                                <li className="list-group-item">
                                    <u>Supplier Name</u>: <strong>{inventoryData.SupplierName}</strong>
                                </li>
                                <li className="list-group-item">
                                    <u>Supplier Contact Info</u>: <strong>{inventoryData.SupplierPhone}</strong>
                                </li>
                                <li className="list-group-item">
                                    <u>Supplier Address</u>: <strong>{inventoryData.SupplierAddress}</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <h4 className="mt-3">Loading Inventory Data...</h4>
                </div>
            )}
        </div>
    );
}

export default Inventory;
