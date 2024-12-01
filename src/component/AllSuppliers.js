import { useEffect, useState } from "react";
import axios from "axios";
import SupplierCard from "./SupplierCard"; // Assuming you have a SupplierCard component
import "./css/AllSupplier.css"
function AllSuppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetching data when component mounts
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get("http://localhost:8800/suppliers");
                setSuppliers(response.data);
            } catch (err) {
                console.error("Error fetching suppliers:", err);
                setError("Failed to load supplier data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    return (
        <div className="container my-5">
            {loading && !error ? (
                <div className="text-center">
                    <h3>Loading supplier data...</h3>
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> {error}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            ) : (
                <div className="row">
                    {suppliers.length > 0 ? (
                        suppliers.map((supplier, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <SupplierCard supplierDetails={supplier} />
                            </div>
                        ))
                    ) : (
                        <h4 className="text-center w-100">No suppliers found.</h4>
                    )}
                </div>
            )}
        </div>
    );
}

export default AllSuppliers;
