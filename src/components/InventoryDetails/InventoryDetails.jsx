import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import DetailsTitle from '../DetailsTitle/DetailsTitle';
import Tag from '../Tag/Tag';
import Toast from "../Toast/Toast";
import "./InventoryDetails.scss";

function InventoryDetails({inventoryId}) {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const [inventoryDetails, setInventoryDetails] = useState(null);
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    async function fetchInventoryDetails() {
        try {
            const {data} = await axios.get(`${baseURL}/api/inventories/${inventoryId}`);
            setInventoryDetails(data);
        }

        catch(error) {
            console.error(error);
            setToast({
                message: `Failed to fetch inventory ID ${inventoryId}`,
                status: "error",
            });
            
            if (error.status === 404) {
                navigate("/notfound");
            }
        }
    }   

    useEffect(() => {
        if (!inventoryId || !baseURL) {
            return;
        }

        fetchInventoryDetails();
    }, [inventoryId, baseURL])

    if (!inventoryDetails && !toast) return <div>Loading...</div>;

    return (
        <section className='invdetails'>
            <DetailsTitle itemName={inventoryDetails.item_name} backLink={"/inventories"} editLink={`/inventories/${inventoryId}/edit`}/>

            <div className='invdetails__info'>
                <div className='invdetails__item'>
                    <div className='invdetails__item-details'>
                        <h3 className='invdetails__label'>ITEM DESCRIPTION:</h3>
                        <p className='invdetails__text invdetails__text--description'>{inventoryDetails.description}</p>  
                    </div>

                    <div className='invdetails__item-details invdetails__item-details--category'>
                        <h3 className='invdetails__label'>CATEGORY:</h3>
                        <p className='invdetails__text'>{inventoryDetails.category}</p>  
                    </div>
                </div>

                <div className='invdetails__stock'>
                    <div className='invdetails__availability'>
                        <div>
                            <h3 className='invdetails__label'>STATUS:</h3>
                            <Tag tag={inventoryDetails.status} status={inventoryDetails.status === "In Stock" ? "default" : "warning"} />
                        </div>

                        <div>
                            <h3 className='invdetails__label'>QUANTITY:</h3>
                            <p className='invdetails__text'>{inventoryDetails.quantity}</p>  
                        </div>
                    </div>

                    <div>
                        <h3 className='invdetails__label'>WAREHOUSE:</h3>
                        <p className='invdetails__text'>{inventoryDetails.warehouse_name}</p>  
                    </div>
                </div>
            </div>

            {toast && <Toast message={toast.message} status={toast.status} />}
        </section>
    );
}

export default InventoryDetails;