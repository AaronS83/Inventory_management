import db from "../db/connection.js";

export const getInventory = (req, res) => {
    const pid = req.params.pid;

    const productQuery = `
    SELECT 
        p.pid AS ProductID, 
        p.pname AS ProductName, 
        p.description AS Description, 
        p.price AS Price, 
        i.quantity AS InventoryQuantity,
        s.sid AS SupplierID,
        s.sname AS SupplierName,
        s.address AS SupplierAddress,
        s.phone_number AS SupplierPhone
    FROM 
        product p
    LEFT JOIN 
        inventory i ON p.pid = i.pid
    LEFT JOIN 
        supplier_product sp ON p.pid = sp.pid
    LEFT JOIN 
        supplier s ON sp.sid = s.sid
    WHERE 
        p.pid = ?;
    `;

    db.query(productQuery, [pid], (err, productData) => {
        if (err) {
            console.error("Database error on product query:", err);
            return res.status(500).json({ error: "Failed to retrieve product data" });
        }

        if (productData.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        const response = productData[0];

        const latestOrderQuery = `
        SELECT 
            o.oid AS OrderID, 
            o.order_date AS OrderDate, 
            o.quantity_ordered AS OrderQuantity, 
            o.order_status AS OrderStatus
        FROM 
            orders o
        WHERE 
            o.pid = ? 
        ORDER BY 
            o.order_date DESC 
        LIMIT 1;
        `;

        db.query(latestOrderQuery, [pid], (err, latestOrderData) => {
            if (err) {
                console.error("Database error on latest order query:", err);
                return res.status(500).json({ error: "Failed to retrieve latest order data" });
            }

            response.latestOrder = latestOrderData.length > 0 ? latestOrderData[0] : null;

            const salesQuery = `
            SELECT 
                sa.sale_id AS SaleID, 
                sa.sale_date AS SaleDate, 
                sa.sold_quantity AS SoldQuantity, 
                sa.total_price AS SaleTotalPrice
            FROM 
                sales sa
            WHERE 
                sa.pid = ?;
            `;

            db.query(salesQuery, [pid], (err, salesData) => {
                if (err) {
                    console.error("Database error on sales query:", err);
                    return res.status(500).json({ error: "Failed to retrieve sales data" });
                }

                response.sales = salesData[0];

                res.json(response);
            });
        });
    });
};
