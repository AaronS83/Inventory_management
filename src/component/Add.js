import { Link } from "react-router-dom";
import './css/Add.css';  // Importing custom CSS file

function Add() {
    return (
        <div className="add-container">
            <div className="text-center mb-5">
                <h3 className="display-4">Choose the Option to Add</h3>
                <p className="lead">Select the category to add new items to your inventory system.</p>
            </div>

            <div className="button-container">
                <div className="row justify-content-center">
                    <div className="col-md-3 mb-3">
                        <Link to='/add/addSales' className="btn btn-outline-primary btn-block">
                            Add Sales
                        </Link>
                    </div>
                    <div className="col-md-3 mb-3">
                        <Link to='/add/addProduct' className="btn btn-outline-primary btn-block">
                            Add Product
                        </Link>
                    </div>
                    <div className="col-md-3 mb-3">
                        <Link to='/add/addOrder' className="btn btn-outline-primary btn-block">
                            Add Order
                        </Link>
                    </div>
                    <div className="col-md-3 mb-3">
                        <Link to='/add/addSupplier' className="btn btn-outline-primary btn-block">
                            Add Supplier
                        </Link>
                    </div>
                    <div className="col-md-3 mb-3">
                        <Link to='/add/addSupplierProduct' className="btn btn-outline-primary btn-block">
                            Add Product by Supplier
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Add;
