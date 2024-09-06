import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import "./WarehouseDetails.scss";

function WarehouseDetails({warehouseId}) {
    const baseURL = import.meta.env.VITE_BASE_URL;
    // const { warehouseId } = useParams();
    const [warehouseDetails, setWarehouseDetails] = useState(null);
    const [warehouseList, setWarehouseList] = useState([]);

    async function fetchWarehouseDetails() {
        try {
            const {data} = await axios.get(`${baseURL}/api/warehouses/${warehouseId}`);
            setWarehouseDetails(data);

            const {data:allData} = await axios.get(`${baseURL}/api/warehouses`);
            setWarehouseList(allData);
        }

        catch(error) {
            console.error(error);
        }
    }   

    useEffect(() => {
        if (!warehouseId || !baseURL) {
            return;
        }

        fetchWarehouseDetails();
    }, [warehouseId, baseURL])

    const validIds = [];
    warehouseList.forEach((warehouse) => validIds.push(warehouse.id));

    if (!warehouseDetails || !warehouseId) {
        if (warehouseId && !validIds.includes(warehouseId)) {
            return <div>This warehouse does not exist</div>;
        } 

        else {
            return <div>Loading...</div>;
        }
    }

    return (
        <h1>{warehouseDetails.warehouse_name}</h1>
    );
}

export default WarehouseDetails;