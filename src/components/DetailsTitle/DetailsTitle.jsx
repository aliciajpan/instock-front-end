import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import backArrowIcon from '../../assets/icons/arrow_back-24px.svg';
import editIcon from '../../assets/icons/edit-white-24px.svg';
import "./DetailsTitle.scss";

function DetailsTitle({itemName, backLink, editLink}) {
    const navigate = useNavigate();

    return (
        <article className='details__title'>
            <div className='details__name'>
                <img className='details__back-icon' onClick={() => navigate(backLink)} src={backArrowIcon} alt="Back arrow icon" />
                <h1>{itemName}</h1>
            </div>

            <div className='details__edit-container'>
                <div className='details__mobile-edit'>
                    <Button onClick={() => navigate(editLink)}>
                            <img className='details__edit-icon' src={editIcon} alt="Edit icon" />
                    </Button>
                </div>

                <div className='details__tablet-edit'>
                    <Button onClick={() => navigate(editLink)}>
                            <img className='details__edit-icon' src={editIcon} alt="Edit icon" /> <span>Edit</span>
                    </Button>
                </div>
            </div>
        </article>
    );
}

export default DetailsTitle;