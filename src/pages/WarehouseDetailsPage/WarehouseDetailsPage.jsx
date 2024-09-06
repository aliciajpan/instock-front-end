import { useParams } from 'react-router-dom';
import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";

function WarehouseDetailsPage() {
    const { warehouseId } = useParams();

    return (
        <WarehouseDetails warehouseId={warehouseId}/>
    );
}

export default WarehouseDetailsPage;
