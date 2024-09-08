import axios from 'axios';
import './AddWarehousePage.scss';
import { useState } from 'react';
import WarehouseInput from '../../components/WarehouseInput/WarehouseInput';
import { useNavigate } from 'react-router-dom';

function AddWarehousePage() {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [toast, setToast] = useState(null);

  const buttons = [
    {
      label: 'Cancel',
      type: 'button',
      status: 'secondary',
      onClick: () => navigate(-1),
    },
    {
      label: '+ Add Warehouse',
      type: 'submit',
      status: 'primary',
    },
  ];

  const handleSubmit = async ({ formData, setToast }) => {
    try {
      await axios.post(`${baseURL}/api/warehouses`, formData);
      setToast({
        message: 'Warehouse added successfully',
        status: 'success',
      });
      setTimeout(() => {
        navigate('/warehouses');
      }, 500);
    } catch (error) {
      console.error(error);
      setToast({
        message: 'Failed to add warehouse',
        status: 'error',
      });
    }
  };

  return (
    <div className="add-warehouse-page">
      <WarehouseInput title="Add New Warehouse" buttons={buttons} onSubmit={handleSubmit} />
      {toast && <Toast message={toast.message} status={toast.status} />}
    </div>
  );
}

export default AddWarehousePage;
