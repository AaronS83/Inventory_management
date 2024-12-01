import { Link, useLocation } from "react-router-dom";
import "./css/Navbar.css";
function Navbar() {
    const location = useLocation(); // Get the current route

    const isActive = (path) => {
        return location.pathname === path ? "active" : "";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/product')}`} to="/product">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/analysis')}`} to="/orders">Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/suppliers')}`} to="/suppliers">Suppliers</Link>
                        </li>
                    </ul>
                </div>

                <div className="d-flex">
                    <Link className={`nav-link ${isActive('/about')}`} to="/about">About</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
