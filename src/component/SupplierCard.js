// import "./css/SupplierCard.css"
function SupplierCard(props) {
    const supplierDetails = props.supplierDetails;
    return (
        <>
            <div className="card" style={{ width: "30rem" }}>
                <div className="card-body">
                    <h5 className="card-title">Supplier ID - {supplierDetails.sid}</h5>
                    <h5 className="card-title">Supplier Name - {supplierDetails.sname}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Product name - {supplierDetails.pname}</h6>
                    <p className="card-text">Product Description - {supplierDetails.description}</p>
                </div>
            </div>
        </>
    )
}

export default SupplierCard;