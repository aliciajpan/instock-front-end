import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import WarehouseInput from '../../components/WarehouseInput/WarehouseInput';
import { useNavigate } from 'react-router-dom';

function EditWarehousePage() {
  const navigate = useNavigate();
  const [warehouse, setWarehouse] = useState(null);
  const { id } = useParams();
  const baseURL = import.meta.env.VITE_BASE_URL;

  const buttons = [
    {
      label: 'Cancel',
      type: 'button',
      status: 'secondary',
      onClick: () => navigate(-1),
    },
    {
      label: 'Save',
      type: 'submit',
      status: 'primary',
    },
  ];
  const [toast, setToast] = useState(null);
  const handleSubmit = async ({ formData, setToast }) => {
    try {
      await axios.put(`${baseURL}/api/warehouses/${id}`, formData);
      setToast({
        message: 'Warehouse updated successfully',
        status: 'success',
      });
      setTimeout(() => {
        navigate('/warehouses');
      }, 500);
    } catch (error) {
      console.error(error);
      setToast({
        message: 'Failed to update warehouse',
        status: 'error',
      });
    }
  };

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/api/warehouses/${id}`);
        setWarehouse(data);
      } catch (error) {
        console.error(error);
        setToast({
          message: 'Failed to fetch warehouse',
          status: 'error',
        });
      }
    };
    fetchWarehouse();
  }, [id, baseURL]);

  if (!warehouse) return <div>Loading...</div>;

  return (
    <div className="edit-warehouse-page">
      <WarehouseInput title="Edit Warehouse" defaultValues={warehouse} buttons={buttons} onSubmit={handleSubmit} />
      {toast && <Toast message={toast.message} status={toast.status} />}
    </div>
  );
}

export default EditWarehousePage;
