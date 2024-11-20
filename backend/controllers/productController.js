import db from "../db/connection.js";

export const getProducts = (req, res) => {
    const query = "SELECT * FROM product";
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};
