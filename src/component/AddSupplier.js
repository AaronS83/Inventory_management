function AddSupplier() {
    return (
        <>
            <div className="container">
                <div class="mb-3 my-4" style={{ width: "40rem" }}>
                    <label for="sName" class="form-label">Enter Supplier Name</label>
                    <input type="text" class="form-control" id="sName" placeholder="Enter the Name of the supplier here" />
                </div>
                <div class="mb-3 my-4" style={{ width: "40rem" }}>
                    <label for="sAddress" class="form-label">Enter Supplier Address</label>
                    <textarea class="form-control" id="sAddress" rows="3" placeholder="Enter the Address of the supplier here"></textarea>
                    {/* <input type="form-control" class="form-control"  rows="3"  /> */}
                </div>
                <div class="mb-3 my-4" style={{ width: "40rem" }}>
                    <label for="sNumber" class="form-label">Enter Supplier Number</label>
                    <input type="number" class="form-control" id="sNumber" placeholder="Enter the Number of the supplier here" />
                </div>
                <div class="col-auto">
                    <button type="submit" class="btn btn-primary mb-3">Submit Details</button>
                </div>
            </div>
        </>
    )
}

export default AddSupplier;