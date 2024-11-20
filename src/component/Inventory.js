import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Inventory() {
    const { pid } = useParams();
    const [inventoryData, setInventoryData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`http://localhost:8800/inventory/${pid}`);
                setInventoryData(result.data);
                console.log(result.data)
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
                    <div className="card" style={{width: "50rem"}}>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><u>Product ID</u>:<strong>{inventoryData.ProductID}</strong></li>
                            <li className="list-group-item"><u>Product Name</u>: <strong>{inventoryData.ProductName}</strong></li>
                            <li className="list-group-item"><u>Description</u>: <strong>{inventoryData.Description}</strong></li>
                            <li className="list-group-item"><u>Quantity in the inventory</u>: <strong>{inventoryData.InventoryQuantity}</strong></li>
                            <li className="list-group-item"><u>Order Id of latest order from the supplier</u>: <strong>{inventoryData.latestOrder.OrderID}</strong> <br/>
                            <Link to={`/sales/${pid}`} className="card-link">Inventory link</Link>
                            </li>
                            <li className="list-group-item"><u>Latest Date ordered from the supplier</u>: <strong>{fetchTime(inventoryData.latestOrder.OrderDate)}</strong></li>
                            <li className="list-group-item"><u>Quantity ordered from the supplier</u>: <strong>{inventoryData.latestOrder.OrderQuantity}</strong></li>
                            <li className="list-group-item"><u>Status of the order from the supplier</u>: <strong>{inventoryData.latestOrder.OrderStatus}</strong></li>
                            <li className="list-group-item"><u>Price of the order</u>: <strong>{inventoryData.Price}</strong></li>
                            <li className="list-group-item"><u>Total quantity of product sold</u>: <strong>{inventoryData.sales.SoldQuantity}</strong><br/>
                            <Link to={`/orders/${pid}`} className="card-link">Sales Link</Link>                            
                            </li>
                            <li className="list-group-item"><u>Total amount made from selling this product</u>: <strong>{inventoryData.sales.SaleTotalPrice}</strong></li>
                            <li className="list-group-item"><u>Name of the supplier</u>: <strong>{inventoryData.SupplierName}</strong></li>
                            <li className="list-group-item"><u>Contact Info of the supplier</u>: <strong>{inventoryData.SupplierPhone}</strong></li>
                            <li className="list-group-item"><u>Address of the supplier</u>: <strong>{inventoryData.SupplierAddress}</strong></li>


                        </ul>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Inventory;
