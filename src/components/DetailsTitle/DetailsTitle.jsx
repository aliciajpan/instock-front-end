import Button from '../Button/Button';
import backArrowIcon from '../../assets/icons/arrow_back-24px.svg';
import editIcon from '../../assets/icons/edit-white-24px.svg';
import "./DetailsTitle.scss";

function DetailsTitle({itemName, backLink, editLink}) {
    return (
            <article className='whdetails__title'>
            <div className='whdetails__name'>
                <img className='whdetails__back-icon' onClick={() => navigate({backLink})} src={backArrowIcon} alt="Back arrow icon" />
                <h1>{itemName}</h1>
            </div>

            <div className='whdetails__edit-container'>
                <div className='whdetails__mobile-edit'>
                    <Button onClick={() => navigate({editLink})}>
                            <img className='whdetails__edit-icon' src={editIcon} alt="Edit icon" />
                    </Button>
                </div>

                <div className='whdetails__tablet-edit'>
                    <Button onClick={() => navigate({editLink})}>
                            <img className='whdetails__edit-icon' src={editIcon} alt="Edit icon" /> <span>Edit</span>
                    </Button>
                </div>
            </div>
        </article>
    );
}

export default DetailsTitle;