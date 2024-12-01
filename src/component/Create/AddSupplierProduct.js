import axios from "axios";
import { useState } from "react";
import '../css/AddSupplierProduct.css'; // Import custom CSS

function AddSupplierProduct() {
    const [pID, setPID] = useState('');
    const [sID, setSID] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const supplierProductData = {
            sID,
            pID
        };

        console.log(supplierProductData);

        try {
            const response = await axios.post('http://localhost:8800/add/addSupplierProduct', supplierProductData);
            console.log("Success", response.data);
            alert("Supplier Product Added Successfully!");
        } catch (error) {
            console.error("Error adding supplier product", error);
            alert("An error occurred while adding the supplier product.");
        }
    };

    return (
        <div className="container add-supplier-product-form">
            <h2 className="text-center mb-4">Add Supplier Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="sID" className="form-label">Enter Supplier ID</label>
                    <input
                        type="number"
                        className="form-control rounded-pill"
                        id="sID"
                        placeholder="Enter the ID of the supplier here"
                        value={sID}
                        onChange={(e) => setSID(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="pID" className="form-label">Enter Product ID</label>
                    <input
                        type="number"
                        className="form-control rounded-pill"
                        id="pID"
                        placeholder="Enter the ID of the product here"
                        value={pID}
                        onChange={(e) => setPID(e.target.value)}
                    />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary rounded-pill mb-3">Submit Details</button>
                </div>
            </form>
        </div>
    );
}

export default AddSupplierProduct;
