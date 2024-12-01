import db from "../db/connection.js";

export const addSupplier = async (req, res) =>{

    const {sName, sAddress, sNumber} = req.body;

    const query = 'INSERT INTO supplier (sname, address, phone_number) VALUES (?, ?, ?)';

    db.query(query, [sName, sAddress, sNumber], (error, result) =>{
        if(error) return res.json(error);

        res.status(200).json(result);
    });
}

export const addSupplierProduct = async (req, res) =>{
    const {sID, pID} = req.body;

    const query = "INSERT INTO supplier_product (sid, pid) VALUES (?, ?)";

    db.query(query, [sID, pID], (err, result) =>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(result);
    })
}

export const addProduct = async (req, res) =>{
    const {pName, price, description} = req.body;

    const query = "INSERT INTO product (pname, description, price) VALUES (?, ?, ?)";

    db.query(query, [pName, description, price], (err, result)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(result);
    }
    )
}


export const addSale = async (req, res) => {
    const { saleDate, pID, soldQuantity } = req.body;

    try {
        // First, get the price and available quantity of the product
        const intermediateQuery = "SELECT product.price, inventory.quantity FROM product JOIN inventory ON product.pid = inventory.pid WHERE product.pid = ?";
        const [intermediateResult] = await db.promise().query(intermediateQuery, [pID]);

        if (intermediateResult.length === 0) {
            return res.status(404).json({ message: "Product not found." });
        }

        const price = intermediateResult[0].price;
        const currentQuantity = intermediateResult[0].quantity;

        // Check if there is enough stock to complete the sale
        if (soldQuantity > currentQuantity) {
            return res.status(400).json({ message: "Not enough stock available." });
        }

        // Calculate total price for the sale
        const total_price = soldQuantity * price;

        // Insert the sale into the sales table
        const salesQuery = "INSERT INTO sales (sale_date, pid, sold_quantity, total_price) VALUES (?, ?, ?, ?)";
        await db.promise().query(salesQuery, [saleDate, pID, soldQuantity, total_price]);

        // Update the inventory quantity
        const newQuantity = currentQuantity - soldQuantity;
        const updateInventoryQuery = "UPDATE inventory SET quantity = ? WHERE pid = ?";
        await db.promise().query(updateInventoryQuery, [newQuantity, pID]);

        // Return success response
        return res.status(200).json({ message: "Sale added and inventory updated successfully." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while processing the sale." });
    }
};

export const addOrder = async (req, res) => {
    const { orderDate, pID, quantityOrdered, supplierID, orderStatus } = req.body;

    try {
        // First, get the price and available quantity of the product
        const intermediateQuery = "SELECT inventory.quantity FROM inventory WHERE inventory.pid = ?";
        const [intermediateResult] = await db.promise().query(intermediateQuery, [pID]);

        if (intermediateResult.length === 0) {
            return res.status(404).json({ message: "Product not found." });
        }

        const currentQuantity = parseInt(intermediateResult[0].quantity, 10);
        const intOrderedQuantity = parseInt(quantityOrdered, 10);
        // Insert the sale into the sales table
        const orderQuery = "INSERT INTO orders (order_date, pid, quantity_ordered, sid, order_status) VALUES (?, ?, ?, ?, ?)";
        await db.promise().query(orderQuery, [orderDate, pID, quantityOrdered, supplierID, orderStatus]);


        if(orderStatus === "completed")
        {
            // Update the inventory quantity
            const newQuantity = currentQuantity + intOrderedQuantity;
            const updateInventoryQuery = "UPDATE inventory SET quantity = ? WHERE pid = ?";
            await db.promise().query(updateInventoryQuery, [newQuantity, pID]);
    
            // Return success response
            return res.status(200).json({ message: "Order added and inventory updated successfully." });
        }
        else
        {
            return res.status(200).json({ message: "Order added." });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while processing the order." });
    }
};