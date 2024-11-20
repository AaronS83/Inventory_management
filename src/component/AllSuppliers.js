import { useEffect, useState } from "react";
import axios from "axios";
import SupplierCard from "./SupplierCard";
function AllSuppliers() {

    const [supplier, setSupplier] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get("http://localhost:8800/suppliers");
                console.log(response.data);
                setSupplier(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchSuppliers();
    }, [])

    return (
        <>
            {loading ? (
                <h1> The data is still Loading</h1>
            )
                :
                (
                    <div className="container my-4">
                        {supplier.map((s, index) => (
                            <div className="conatiner my-4" key={index}>
                                <SupplierCard supplierDetails={s} />
                            </div>
                        ))}
                    </div>
                )}
        </>
    )
}

export default AllSuppliers;