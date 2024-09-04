import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import WarehouseList from './pages/WarehouseList/WarehouseList';
import InventoryList from './pages/InventoryList/InventoryList';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import WarehouseCard from './pages/WarehouseCard/WarehouseCard';
import InventoryCard from './pages/InventoryCard/InventoryCard';
import AddWarehouse from './pages/AddWarehouse/AddWarehouse';
import AddInventory from './pages/AddInventory/AddInventory';
import EditWarehouse from './pages/EditWarehouse/EditWarehouse';
import EditInventory from './pages/EditInventory/EditInventory';
import DeleteWarehouse from './pages/DeleteWarehouse/DeleteWarehouse';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<WarehouseList />} />
        <Route path="/inventories" element={<InventoryList />} />
        <Route path="/warehouses/add" element={<AddWarehouse />} />
        <Route path="/inventories/add" element={<AddInventory />} />
        <Route path="/warehouses/:id" element={<WarehouseCard />} />
        <Route path="/warehouses/edit/:id" element={<EditWarehouse />} />
        <Route path="/inventories/:id" element={<InventoryCard />} />
        <Route path="/inventories/edit/:id" element={<EditInventory />} />
        <Route path="/warehouses/delete/:id" element={<DeleteWarehouse />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
