import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import backArrowIcon from '../../assets/icons/arrow_back-24px.svg';
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
        <>
            <div className='whdetails__title'>
                <img src={backArrowIcon} alt="Back arrow icon" />
                <h1>{warehouseDetails.warehouse_name}</h1>
                <Button onClick={() => navigate("/inventories/add")}>
                        + Add New Item
                </Button>
            </div>

            <div>
                <div>
                    <h3>WAREHOUSE ADDRESS:</h3>
                    <p>{warehouseDetails.address}, {warehouseDetails.city}, {warehouseDetails.country}</p>  
                </div>

                <div className='whdetails__contact'>
                    <div>
                        <h3>CONTACT NAME:</h3>
                        <p>{warehouseDetails.contact_name}</p>
                        <p>{warehouseDetails.contact_position}</p>
                    </div>
                    <div>
                        <h3>CONTACT INFORMATION:</h3>
                        <p>{warehouseDetails.contact_phone}</p>
                        <p>{warehouseDetails.contact_email}</p>
                    </div>
                </div>
                
            </div>
            
        </>
    );
}

export default WarehouseDetails;