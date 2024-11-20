import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
function Product() {

    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await axios("http://localhost:8800/product");
                setProduct(result.data);
                console.log(product.data);
                // console.log(result)
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchProduct();
    }, [])

    return (
        <>
            {/* <ol>
                <li>iNotes
                    <ul>
                        <li>This is a MERN stack based project.</li>
                        <li>In this project, the user can create, delete, read and update their own private notes.</li>
                        <li>The notes of each user is private and they can modify it anytime they want.</li>
                    </ul>
                </li>
                <li>Swiggy Clone
                    <ul>
                        <li>This is a MERN stack based project.</li>
                        <li>This is a 4 person project that uses the swiggy api to fetch real-time swiggy information and display it</li>
                        <li>The user can add items to the cart.</li>
                        <li>Since this is a purely front-end project, except for the signup and login, none of the other data is sent to the database.</li>
                    </ul>
                </li>
                <li>RL based pathfinder
                    <ul>
                        <li>This is a Reinforcement Learning Project.</li>
                        <li>The main goal of this project is to map a path between 2 points in an area without any roads.</li>
                        <li>We wanted to reduce the deforestation during building the road.</li>
                    </ul>
                </li>
            </ol> */}
            {/* <div className="container">
                <ol>
                    {product.map((value, index) => (<li key={index}> {value.id} {value.pname}, {value.description} <br /> Cost is {value.price} <p /> </li>))}
                </ol>
            </div> */}

            {loading ?
                (
                    <h4>Loading...</h4>
                )
                :
                (
                    <div className="container">
                        {product.map((value, index) => (
                            <div className="my-4" key={index} style={{ marginRight: '18 rem' }}>
                                <ProductCard product={value} />
                            </div>
                        ))}
                    </div>
                )}

        </>
    )
}

export default Product;