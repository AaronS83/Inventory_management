import axios from "axios";
import { useState } from "react";
import '../css/AddProduct.css'; // Import the custom CSS file

function AddProduct() {
    const [pName, setPName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!pName || !price || !description) {
            setErrorMessage("All fields are required.");
            return;
        }

        const productDetails = {
            pName,
            price,
            description
        };

        try {
            setLoading(true);
            const result = await axios.post('http://localhost:8800/add/addProduct', productDetails);
            console.log(result);
            alert("Product successfully added!");
            setLoading(false);
        } catch (error) {
            console.error("Error adding product:", error.response?.data);
            setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
            setLoading(false);
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Add New Product</h2>

            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="pName" className="form-label">Product Name</label>
                    <input
                        type="text"
                        className="form-control rounded-pill"
                        id="pName"
                        placeholder="Enter the name of the product"
                        value={pName}
                        onChange={(e) => setPName(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="form-label">Product Price</label>
                    <input
                        type="number"
                        className="form-control rounded-pill"
                        id="price"
                        placeholder="Enter the price of the product"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="form-label">Product Description</label>
                    <textarea
                        className="form-control rounded-3"
                        id="description"
                        rows="4"
                        placeholder="Enter the description of the product"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className="d-grid gap-2">
                    <button
                        type="submit"
                        className="btn btn-primary rounded-pill"
                        disabled={loading || !pName || !price || !description}
                    >
                        {loading ? "Submitting..." : "Submit Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProduct;
