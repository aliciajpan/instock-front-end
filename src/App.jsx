import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import WarehouseList from './components/WarehouseList/WarehouseList';
import InventoryList from './components/InventoryList/InventoryList';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import WarehouseCard from './components/WarehouseCard/WarehouseCard';
import InventoryCard from './components/InventoryCard/InventoryCard';
import AddWarehouse from './components/AddWarehouse/AddWarehouse';
import AddInventory from './components/AddInventory/AddInventory';
import EditWarehouse from './components/EditWarehouse/EditWarehouse';
import EditInventory from './components/EditInventory/EditInventory';

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

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
