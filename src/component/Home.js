import { Link } from "react-router-dom";
import "./css/Home.css"  // Importing custom CSS file

function Home() {
    return (
        <div className="home-container">
            <div className="jumbotron text-center">
                <h1 className="display-4">Inventory Management</h1>
                <p className="lead">Manage and track all your inventories with ease!</p>
            </div>

            <div className="button-container">
                <div className="row text-center">
                    <div className="col-md-3">
                        <Link className="btn btn-info btn-lg" to="/product">
                            <i className="fas fa-box"></i> View Products
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link className="btn btn-primary btn-lg" to="/add">
                            <i className="fas fa-plus-circle"></i> Add Menu
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link className="btn btn-secondary btn-lg" to="/suppliers">
                            <i className="fas fa-truck"></i> View Suppliers
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link className="btn btn-danger btn-lg" to="/orders">
                            <i className="fas fa-clipboard-list"></i> View Orders
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
