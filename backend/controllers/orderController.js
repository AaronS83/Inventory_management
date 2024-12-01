import db from "../db/connection.js";

export const getOrders = (req, res) => {
    const query = "SELECT product.pname, ORDERS.oid, ORDERS.order_date, ORDERS.quantity_ordered, ORDERS.sid, ORDERS.order_status FROM ORDERS JOIN PRODUCT ON ORDERS.pid = PRODUCT.pid WHERE ORDERS.PID = ?";
    const pid = req.params.pid;
    db.query(query, [pid], (err, ordersData) => {
        if (err) return res.json(err);
        return res.json(ordersData);
    });
};

export const getAllOrders = (req, res) => {
    const query = "SELECT o.oid, o.order_date, o.quantity_ordered, o.sid, o.order_status, p.pname, p.description, p.price FROM orders as o inner join product as p where o.pid = p.pid ORDER BY o.order_date desc";

    db.query(query, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(result);
    })
}

export const updateOrder = async (req, res) => {
    const { oid, orderDate, quantityOrdered, orderStatus, sid } = req.body;
    const intermed = "SELECT pid, order_status, quantity_ordered FROM orders WHERE oid = ?";

    try {
        const [rows] = await db.promise().query(intermed, [oid]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Order not found!' });
        }

        const { pid, order_status, order_amount } = rows[0];

        if (order_status === 'completed') {
            return res.status(400).json({ message: 'Cannot change completed order Order Status' });
        }

        if (orderStatus === 'completed') {
            // Check inventory before completing the order
            const modifyQuantity = "SELECT quantity FROM inventory WHERE pid = ?";
            const [inventoryRows] = await db.promise().query(modifyQuantity, [pid]);

            if (inventoryRows.length === 0) {
                return res.status(404).json({ message: 'Product not found in inventory!' });
            }

            const oldQuantity = parseInt(inventoryRows[0].quantity, 10);
            const addQuantity = parseInt(quantityOrdered, 10);

            const newQuantity = oldQuantity + addQuantity;
            const inventoryUpdate = "UPDATE inventory SET quantity = ? WHERE pid = ?";
            
            // Update inventory and then update the order
            await db.promise().query(inventoryUpdate, [newQuantity, pid]);
        }

        const query = `
            UPDATE orders 
            SET order_date = ?, quantity_ordered = ?, order_status = ?, sid = ? 
            WHERE oid = ?
        `;
        const [result] = await db.promise().query(query, [orderDate, quantityOrdered, orderStatus, sid, oid]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Order and inventory updated successfully!' });
        }

        return res.status(404).json({ message: 'Order not found!' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred while updating the order.', error: err.message });
    }
};


export const getOrder = (req, res) => {
    const { oid } = req.params;
    const query = "SELECT * FROM orders WHERE oid = ?";

    db.query(query, [oid], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length > 0) {
            return res.status(200).json(result[0]);
        }
        return res.status(404).json({ message: "Order not found" });
    });
};
