// import express from "express";
// import mysql from "mysql2";
// import cors from "cors";

// const app = express();
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "rootSQL",
//     database: "inventory"
// });

// app.use(express.json());
// app.use(cors());

// db.connect((err) => {
//     if (err) {
//         console.error("Database connection failed:", err);
//         process.exit(1);
//     }
//     console.log("Connected to MySQL database");
// });

// app.get("/", (req, res) => {
//     res.json("Hello world 21");
// });

// app.get('/product', (req, res) => {
//     const q = "SELECT * FROM product";
//     db.query(q, (err, data) => {
//         if (err) return res.json(err);
//         return res.json(data);
//     });
// });

// app.get('/inventory/:pid', (req, res) => {
//     const pid = req.params.pid;

//     // Step 1: Query Product, Inventory, and Supplier Information
//     const productQuery = `
//     SELECT 
//         p.pid AS ProductID, 
//         p.pname AS ProductName, 
//         p.description AS Description, 
//         p.price AS Price, 
//         i.quantity AS InventoryQuantity,
//         s.sid AS SupplierID,
//         s.sname AS SupplierName,
//         s.address AS SupplierAddress,
//         s.phone_number AS SupplierPhone
//     FROM 
//         product p
//     LEFT JOIN 
//         inventory i ON p.pid = i.pid
//     LEFT JOIN 
//         supplier_product sp ON p.pid = sp.pid
//     LEFT JOIN 
//         supplier s ON sp.sid = s.sid
//     WHERE 
//         p.pid = ?;
//     `;

//     db.query(productQuery, [pid], (err, productData) => {
//         if (err) {
//             console.error("Database error on product query:", err);
//             return res.status(500).json({ error: "Failed to retrieve product data" });
//         }

//         // If no product is found
//         if (productData.length === 0) {
//             return res.status(404).json({ error: "Product not found" });
//         }

//         // Store product information in response object
//         const response = productData[0];

//         // Step 2: Query the Latest Order Information
//         const latestOrderQuery = `
//         SELECT 
//             o.oid AS OrderID, 
//             o.order_date AS OrderDate, 
//             o.quantity_ordered AS OrderQuantity, 
//             o.order_status AS OrderStatus
//         FROM 
//             orders o
//         WHERE 
//             o.pid = ?
//         ORDER BY 
//             o.order_date DESC 
//         LIMIT 1;
//         `;

//         db.query(latestOrderQuery, [pid], (err, latestOrderData) => {
//             if (err) {
//                 console.error("Database error on latest order query:", err);
//                 return res.status(500).json({ error: "Failed to retrieve latest order data" });
//             }

//             // Add the latest order data (if exists) to the response object
//             response.latestOrder = latestOrderData.length > 0 ? latestOrderData[0] : null;

//             // Step 3: Query Sales Information
//             const salesQuery = `
//             SELECT 
//                 sa.sale_id AS SaleID, 
//                 sa.sale_date AS SaleDate, 
//                 sa.sold_quantity AS SoldQuantity, 
//                 sa.total_price AS SaleTotalPrice
//             FROM 
//                 sales sa
//             WHERE 
//                 sa.pid = ?;
//             `;

//             db.query(salesQuery, [pid], (err, salesData) => {
//                 if (err) {
//                     console.error("Database error on sales query:", err);
//                     return res.status(500).json({ error: "Failed to retrieve sales data" });
//                 }

//                 // Add sales data to response object
//                 response.sales = salesData[0];

//                 // Send the final response with product, latest order, and sales data
//                 res.json(response);
//             });
//         });
//     });
// });


// app.get('/sales/:pid', (req, res)=>{
//     const query = "SELECT PRODUCT.pname, ORDERS.oid, ORDERS.order_date, ORDERS.quantity_ordered, ORDERS.sid, ORDERS.order_status FROM ORDERS JOIN PRODUCT ON ORDERS.pid = PRODUCT.pid WHERE ORDERS.PID = ?"
//     const pid = req.params.pid;
//     db.query(query, [pid], (err, ordersData)=>{
//         if(err)
//         {
//             return res.json(err);
//         }
//         return res.json(ordersData);
//     })

// })

// app.get('/orders/:pid', (req, res) =>{
//     const query = "SELECT product.pname, product.price ,sales.sale_id, sales.sale_date, sales.sold_quantity, sales.total_price from sales join product ON product.pid = sales.pid where sales.pid = ? ";
//     const pid = req.params.pid;

//     db.query(query, [pid], (err, saleData)=>{
//         if(err) return res.json(err);
//         return res.json(saleData);
//     })
// })

// app.get('/analysis/:pid', async (req, res) => {
//     const pid = req.params.pid;

//     try {
        
//         const q = "SELECT pname FROM product WHERE pid = ?";
//         const pnameData = await new Promise((resolve, reject) => {
//             db.query(q, [pid], (err, data) => {
//                 if (err) reject(err);
//                 else resolve(data);
//             });
//         });

//         // If pnameData is empty or null, handle the error
//         if (pnameData.length === 0) {
//             return res.status(404).json({ error: 'Product not found' });
//         }
//         const pname = pnameData[0].pname;
//         // return res.json(pnameData[0]);

//         // Query for order data
//         const orderQuery = "SELECT count(oid) as number, max(quantity_ordered) as quantity, sum(quantity_ordered) as total FROM orders WHERE pid = ?";
//         const ordersData = await new Promise((resolve, reject) => {
//             db.query(orderQuery, [pid], (err, data) => {
//                 if (err) reject(err);
//                 else resolve(data);
//             });
//         });
        
//         // Query for sales data
//         const saleQuery = "SELECT count(sale_id) as number, max(sold_quantity) as quantity, sum(total_price) as total FROM sales WHERE pid = ?";
//         const salesData = await new Promise((resolve, reject) => {
//             db.query(saleQuery, [pid], (err, data) => {
//                 if (err) reject(err);
//                 else resolve(data);
//             });
//         });

//         // Prepare the final result
//         const finalResult = {
//             pname: pnameData[0],
//             order: ordersData[0],
//             sale: salesData[0]
//         };

//         // Send the final response
//         res.json(finalResult);
//     } catch (err) {
//         // Handle errors
//         res.status(500).json({ error: err.message });
//     }
// });


// app.listen(8800, () => {
//     console.log('Server running on port 8800');
// });


import express from "express";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js"
import addRoutes from "./routes/addRoutes.js"
const app = express();
const PORT = 8800;

app.use(express.json());
app.use(cors());
 
app.use('/product', productRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/orders', orderRoutes);
app.use('/analysis', analysisRoutes);
app.use('/sales', salesRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/add', addRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})