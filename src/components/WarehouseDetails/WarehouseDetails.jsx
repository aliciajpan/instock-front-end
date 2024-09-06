import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Button from '../Button/Button';
import backArrowIcon from '../../assets/icons/arrow_back-24px.svg';
import editIcon from '../../assets/icons/edit-white-24px.svg';
import "./WarehouseDetails.scss";

function WarehouseDetails({warehouseId}) {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
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
        <div className='whdetails'>
            <div className='whdetails__title'>
                <div className='whdetails__name'>
                    <img className='whdetails__back-icon' onClick={() => navigate("/warehouses")} src={backArrowIcon} alt="Back arrow icon" />
                    <h1>{warehouseDetails.warehouse_name}</h1>
                </div>

                <div className='whdetails__edit-container'>
                    <Button onClick={() => navigate("/inventories/add")}>
                            <img className='whdetails__edit-icon' src={editIcon} alt="Edit icon" />
                    </Button>
                </div>
                
            </div>

            <div className='whdetails__info'>
                <div className='whdetails__address'>
                    <h3 className='whdetails__label'>WAREHOUSE ADDRESS:</h3>
                    <p className='whdetails__text'>{warehouseDetails.address}, {warehouseDetails.city}, {warehouseDetails.country}</p>  
                </div>

                <div className='whdetails__contact'>
                    <div>
                        <h3 className='whdetails__label'>CONTACT NAME:</h3>
                        <p className='whdetails__text'>{warehouseDetails.contact_name}</p>
                        <p className='whdetails__text'>{warehouseDetails.contact_position}</p>
                    </div>
                    <div>
                        <h3 className='whdetails__label'>CONTACT INFORMATION:</h3>
                        <p className='whdetails__text'>{warehouseDetails.contact_phone}</p>
                        <p className='whdetails__text'>{warehouseDetails.contact_email}</p>
                    </div>
                </div>
                
            </div>
            
        </div>
    );
}

export default WarehouseDetails;