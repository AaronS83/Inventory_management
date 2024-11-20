import db from "../db/connection.js";

export const getSuppliers = async (req, res)=>{
    
    const query = "select supplier.sid, supplier.sname, product.pname, product.description from supplier inner join supplier_product on supplier_product.sid = supplier.sid inner join product on product.pid = supplier_product.pid";

    db.query(query, (err,supplierData)=>{
        if(err) return res.json(err);
        return res.json(supplierData);
    })
} 