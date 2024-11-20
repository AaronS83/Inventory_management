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
import AddOrder from './component/AddOrder';
import AddProduct from './component/AddProduct';
import AddSales from './component/AddSales';
import AddSupplier from './component/AddSupplier';
import AllSuppliers from './component/AllSuppliers';


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
      <Route exact path='/addProduct' element={<AddProduct/>}></Route>
      <Route exact path='/addSales' element={<AddSales/>}></Route>
      <Route exact path='/addOrder' element={<AddOrder/>}></Route>
      <Route exact path='/addSupplier' element={<AddSupplier/>}></Route>
      <Route exact path='/suppliers' element={<AllSuppliers/>}></Route>
    </Routes>
   {/* <Project/> */}
   </BrowserRouter>
    </>
  );
}

export default App;
