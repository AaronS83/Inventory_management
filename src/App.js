import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./component/Navbar"
import Product from './component/Product';
import About from './component/About';
import Home from './component/Home'
import Analysis from './component/Analysis';
import Inventory from './component/Inventory';
import Sales from './component/Sales'
import Order from './component/Order';
import Add from './component/Add';
import AddOrder from './component/Create/AddOrder';
import AddProduct from './component/Create/AddProduct';
import AddSales from './component/Create/AddSales';
import AddSupplier from './component/Create/AddSupplier';
import AllSuppliers from './component/AllSuppliers';
import AddSupplierProduct from './component/Create/AddSupplierProduct';
import UpdateOrder from './component/Update/UpdateOrder';
import EditOrder from './component/Update/EditOrder';

import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/product' element={<Product/>}></Route>
      <Route exact path='/about' element={<About/>}></Route>
      <Route exact path='/analysis/:pid' element={<Analysis/>}></Route>
      <Route exact path='/inventory/:pid' element={<Inventory/>}></Route>
      <Route exact path='/sales/:pid' element={<Sales/>}></Route>
      <Route exact path='/orders/:pid' element={<Order/>}></Route>
      <Route exact path='/add' element={<Add/>}></Route>
      <Route exact path='/suppliers' element={<AllSuppliers/>}></Route>
      <Route exact path='/add/addProduct' element={<AddProduct/>}></Route>
      <Route exact path='/add/addSales' element={<AddSales/>}></Route>
      <Route exact path='/add/addOrder' element={<AddOrder/>}></Route>
      <Route exact path='/add/addSupplier' element={<AddSupplier/>}></Route>
      <Route exact path='/add/addSupplierProduct' element={<AddSupplierProduct/>}></Route>
      <Route exact path='/orders' element={<UpdateOrder/>}></Route>
      <Route exact path='/orders/:oid/edit' element={<EditOrder/>}></Route>
    </Routes>
   {/* <Project/> */}
   </BrowserRouter>
    </>
  );
}

export default App;
