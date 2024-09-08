import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import DetailsTitle from '../DetailsTitle/DetailsTitle';
import Toast from "../../components/Toast/Toast";
import "./WarehouseDetails.scss";

function WarehouseDetails({warehouseId}) {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const [warehouseDetails, setWarehouseDetails] = useState(null);
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    async function fetchWarehouseDetails() {
        try {
            const {data} = await axios.get(`${baseURL}/api/warehouses/${warehouseId}`);
            setWarehouseDetails(data);
        }

        catch(error) {
            console.error(error);
            setToast({
                message: `Failed to fetch warehouse ID ${warehouseId}`,
                status: "error",
            });
            setWarehouseDetails({});
            
            if (error.status === 404) {
                navigate("/notfound");
            }
        }
    }   

    useEffect(() => {
        if (!warehouseId || !baseURL) {
            return;
        }

        fetchWarehouseDetails();
    }, [warehouseId, baseURL])

    if (!warehouseDetails && !toast) return <div>Loading...</div>;

    return (
        <section className='whdetails'>
            <DetailsTitle itemName={warehouseDetails.warehouse_name} backLink={"/warehouses"} editLink={`/warehouses/${warehouseId}/edit`}/>

            <div className='whdetails__info'>
                <div className='whdetails__address'>
                    <h3 className='whdetails__label'>WAREHOUSE ADDRESS:</h3>
                    <p className='whdetails__text'>{warehouseDetails.address},</p>  
                    <p className='whdetails__text'>{warehouseDetails.city}, {warehouseDetails.country}</p>  
                    
                </div>

                <div className='whdetails__contact'>
                    <div className='whdetails__contact-details'>
                        <h3 className='whdetails__label'>CONTACT NAME:</h3>
                        <p className='whdetails__text'>{warehouseDetails.contact_name}</p>
                        <p className='whdetails__text'>{warehouseDetails.contact_position}</p>
                    </div>
                    <div className='whdetails__contact-details'>
                        <h3 className='whdetails__label'>CONTACT INFORMATION:</h3>
                        <p className='whdetails__text'>{warehouseDetails.contact_phone}</p>
                        <p className='whdetails__text'>{warehouseDetails.contact_email}</p>
                    </div>
                </div>
                
            </div>
            {toast && <Toast message={toast.message} status={toast.status} onClose={()=>{setToast(null)}}/>}
        </section>
    );
}

export default WarehouseDetails;