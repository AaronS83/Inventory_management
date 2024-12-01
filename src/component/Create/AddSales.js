import axios from "axios";
import { useState } from "react";
import '../css/AddSales.css'; // Import the custom CSS

function AddSales() {
    const [saleDate, setSaleDate] = useState('');
    const [pID, setPID] = useState('');
    const [soldQuantity, setSoldQuantity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentDate = new Date().toISOString().split('T')[0]; 
        const finalSaleDate = saleDate || currentDate; 

        const salesData = {
            saleDate: finalSaleDate,
            pID,
            soldQuantity,
        };

        try {
            const result = await axios.post('http://localhost:8800/add/addSale', salesData);
            console.log("Sale successfully added:", result.data);
            alert("Sale successfully added!");
        } catch (error) {
            console.error("Error adding sale:", error.response.data);
            alert("Error adding sale: " + error.response.data.message);
        }
    };

    return (
        <div className="container add-sales-form">
            <h2 className="text-center mb-4">Add a New Sale</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="saleDate" className="form-label">Enter Date of Sale</label>
                    <input 
                        type="date" 
                        className="form-control rounded-pill"
                        id="saleDate" 
                        value={saleDate}
                        onChange={(e) => setSaleDate(e.target.value)}
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
                    <label htmlFor="soldQuantity" className="form-label">Enter Sold Quantity</label>
                    <input 
                        type="number" 
                        className="form-control rounded-pill" 
                        id="soldQuantity" 
                        placeholder="Enter the Quantity Sold"
                        value={soldQuantity}
                        onChange={(e) => setSoldQuantity(e.target.value)}
                    />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary rounded-pill mb-3">Submit Details</button>
                </div>
            </form>
        </div>
    );
}

export default AddSales;
