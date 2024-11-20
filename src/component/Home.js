import { Link } from "react-router-dom";

function Home() {


    return (
        <>
            <div className="container my-4">
                <h1> Inventory Management</h1>
                <p>All the inventories are present here</p>
                <Link className="btn btn-info" to={'/product'}>Go to all availible product</Link>
                <br /><br />
                <Link className="btn btn-primary" to={'/add'}>
                    Add page
                </Link>
                <br/>
                <br/>
                <Link className="btn btn-secondary" to={'/suppliers'}> See all Supplier and their details </Link>
            </div>
        </>
    )
}

export default Home;