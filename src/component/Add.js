import {Link} from "react-router-dom";

function Add(){
    return (
        <>
        <div className="container">
            <h3>Choose the option to add to</h3>
            <Link to='/addSales' className="btn btn-outline-primary"> Sales</Link>
            <br/>
            <Link to='/addProduct' className="my-4 btn btn-outline-primary"> Product</Link>
            <br/>
            <Link to='/addOrder' className=" btn btn-outline-primary"> Order</Link>
            <br/>
            <Link to='/addSupplier' className="my-4 btn btn-outline-primary"> Supplier</Link>
        </div>
        </>
    )
}

export default Add;