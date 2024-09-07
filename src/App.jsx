import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import WarehouseListPage from './pages/WarehouseListPage/WarehouseListPage';
import InventoryListPage from './pages/InventoryListPage/InventoryListPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import WarehouseDetailsPage from './pages/WarehouseDetailsPage/WarehouseDetailsPage';
import AddWarehouse from './pages/AddWarehousePage/AddWarehousePage';
import AddInventoryPage from './pages/AddInventoryPage/AddInventoryPage';
import EditWarehouse from './pages/EditWarehouse/EditWarehouse';
import EditInventoryPage from './pages/EditInventoryPage/EditInventoryPage';
import Footer from './components/Footer/Footer';
import InventoryDetailsPage from './pages/InventoryDetailsPage/InventoryDetailsPage';

function App() {

  return (
    <Router>
      <div className='app'>
        <Header />
        <main className='app__main'>
          <div className='app__main-content'>
            <Routes>
              <Route path="/" element={<Navigate to="/warehouses" replace={true} />} />
              <Route path="/warehouses" element={<WarehouseListPage />} />
              <Route path="/inventories" element={<InventoryListPage />} />
              <Route path="/warehouses/add" element={<AddWarehouse />} />
              <Route path="/inventories/add" element={<AddInventoryPage />} />
              <Route path="/warehouses/:warehouseId" element={<WarehouseDetailsPage />} />
              <Route path="/warehouses/:id/edit" element={<EditWarehouse />} />
              <Route path="/inventories/:inventoryId" element={<InventoryDetailsPage />} />
              <Route path="/inventories/:id/edit" element={<EditInventoryPage />} />
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
