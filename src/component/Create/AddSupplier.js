import axios from "axios";
import { useState } from "react";
import '../css/AddSupplier.css'; // Import the custom CSS

function AddSupplier() {
    const [sName, setSName] = useState('');
    const [sAddress, setSAddress] = useState('');
    const [sNumber, setSNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const supplierData = {
            sName,
            sAddress,
            sNumber
        };
        console.log(supplierData);
        try {
            const response = await axios.post('http://localhost:8800/add/addSupplier', supplierData);
            console.log("Success", response.data);
            alert("Supplier added successfully!");
        } catch (error) {
            console.log(error);
            alert("An error occurred while adding the supplier.");
        }
    }

    return (
        <div className="container add-supplier-form">
            <h2 className="text-center mb-4">Add New Supplier</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="sName" className="form-label">Enter Supplier Name</label>
                    <input 
                        type="text" 
                        className="form-control rounded-pill"
                        id="sName" 
                        placeholder="Enter the Name of the supplier here"
                        value={sName}
                        onChange={(e) => setSName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="sAddress" className="form-label">Enter Supplier Address</label>
                    <textarea 
                        className="form-control rounded-pill" 
                        id="sAddress" 
                        rows="3" 
                        placeholder="Enter the Address of the supplier here"
                        value={sAddress}
                        onChange={(e) => setSAddress(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="sNumber" className="form-label">Enter Supplier Phone Number</label>
                    <input 
                        type="number" 
                        className="form-control rounded-pill" 
                        id="sNumber" 
                        placeholder="Enter the Number of the supplier here"
                        value={sNumber}
                        onChange={(e) => setSNumber(e.target.value)}
                    />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary rounded-pill mb-3">Submit Details</button>
                </div>
            </form>
        </div>
    );
}

export default AddSupplier;
