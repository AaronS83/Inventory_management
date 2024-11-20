import db from "../db/connection.js";

export const getAnalysis = async (req, res) => {
    const pid = req.params.pid;

    try {
        const q = "SELECT pname FROM product WHERE pid = ?";
        const pnameData = await new Promise((resolve, reject) => {
            db.query(q, [pid], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        if (pnameData.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const pname = pnameData[0].pname;

        const orderQuery = "SELECT count(oid) as number, max(quantity_ordered) as quantity, sum(quantity_ordered) as total FROM orders WHERE pid = ?";
        const ordersData = await new Promise((resolve, reject) => {
            db.query(orderQuery, [pid], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        const saleQuery = "SELECT count(sale_id) as number, max(sold_quantity) as quantity, sum(total_price) as total FROM sales WHERE pid = ?";
        const salesData = await new Promise((resolve, reject) => {
            db.query(saleQuery, [pid], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        const finalResult = {
            pname: pnameData[0],
            order: ordersData[0],
            sale: salesData[0]
        };

        res.json(finalResult);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
