import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import WarehouseListPage from './pages/WarehouseListPage/WarehouseListPage';
import InventoryListPage from './pages/InventoryListPage/InventoryListPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import WarehouseCard from './pages/WarehouseCard/WarehouseCard';
import InventoryCard from './pages/InventoryCard/InventoryCard';
import AddWarehouse from './pages/AddWarehouse/AddWarehouse';
import AddInventoryPage from './pages/AddInventoryPage/AddInventoryPage';
import EditWarehouse from './pages/EditWarehouse/EditWarehouse';
import EditInventory from './pages/EditInventory/EditInventory';
import Footer from './components/Footer/Footer';
import DeleteWarehouse from './pages/DeleteWarehouse/DeleteWarehouse';
import DeleteInventory from './pages/DeleteInventory/DeleteInventory';

function App() {

  return (
    <Router>
      <div className='app'>
        <Header />
        <main className='app__main'>
          <div className='app__main-content'>
            <Routes>
                <Route path="/" element={<WarehouseListPage />} />
                <Route path="/warehouses" element={<WarehouseListPage />} />
                <Route path="/inventories" element={<InventoryListPage />} />
                <Route path="/warehouses/add" element={<AddWarehouse />} />
                <Route path="/inventories/add" element={<AddInventoryPage />} />
                <Route path="/warehouses/:id" element={<WarehouseCard />} />
                <Route path="/warehouses/edit/:id" element={<EditWarehouse />} />
                <Route path="/inventories/:id" element={<InventoryCard />} />
                <Route path="/inventories/edit/:id" element={<EditInventory />} />
                <Route path="/warehouses/delete/:id" element={<DeleteWarehouse />} />
                <Route path="/inventories/delete/:id" element={<DeleteInventory />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
