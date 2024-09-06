import { useParams } from 'react-router-dom';
import InventoryList from "../../components/InventoryList/InventoryList";

function WarehouseDetailsPage() {
    const { warehouseId } = useParams();

    const inventoryListHeaderItems = [
      { key: "item_name", name: "Inventory Item", sortable: true },
      { key: "category", name: "Category", sortable: true },
      { key: "status", name: "Status", sortable: true },
      { key: "quantity", name: "Qty", sortable: true },
      { key: "actions", name: "Actions", sortable: false },
    ];

    return (
      <>
        <InventoryList
          warehouseId={warehouseId}
          headerItems={inventoryListHeaderItems}
        />
      </>
    );
}

export default WarehouseDetailsPage;
