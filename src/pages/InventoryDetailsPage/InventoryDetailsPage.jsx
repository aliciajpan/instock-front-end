import { useParams } from 'react-router-dom';
import InventoryDetails from '../../components/InventoryDetails/InventoryDetails';

function InventoryDetailsPage() {
    const { inventoryId } = useParams();

    return (
      <>
        <InventoryDetails inventoryId={inventoryId}/>
      </>
    );
}

export default InventoryDetailsPage;
