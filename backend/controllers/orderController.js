import db from "../db/connection.js";

export const getOrders = (req, res) => {
    const query = "SELECT product.pname, ORDERS.oid, ORDERS.order_date, ORDERS.quantity_ordered, ORDERS.sid, ORDERS.order_status FROM ORDERS JOIN PRODUCT ON ORDERS.pid = PRODUCT.pid WHERE ORDERS.PID = ?";
    const pid = req.params.pid;
    db.query(query, [pid], (err, ordersData) => {
        if (err) return res.json(err);
        return res.json(ordersData);
    });
};
