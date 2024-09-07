import { useParams } from 'react-router-dom';
import EditWarehouseForm from '../../components/EditWarehouseForm/EditWarehouseForm';

function EditWarehousePage() {
  const { id } = useParams();

  return (
    <>
      <EditWarehouseForm warehouseId={id} />
    </>
  );
}

export default EditWarehousePage;
