import db from "../db/connection.js";

export const getSales = (req, res) => {
    const query = "SELECT product.pname, product.price, sales.sale_id, sales.sale_date, sales.sold_quantity, sales.total_price FROM sales JOIN product ON product.pid = sales.pid WHERE sales.pid = ?";
    const pid = req.params.pid;

    db.query(query, [pid], (err, saleData) => {
        if (err) return res.json(err);
        return res.json(saleData);
    });
};
