import "./FormField.scss";

const FormField = ({ icon = null, placeholder, label = null, status = "default", name = null, ...props }) => {
    
    return (
        <div className="form-field">
            {label && <label className="form-field__label" htmlFor={name}>{label}</label>}
            <input
                id={name}
                name={name}
                className={`form-field__input form-field__input--${status}`}
                type="text"
                placeholder={placeholder}
                {...props}
            />
            {icon && (
                <img className="form-field__icon" src={icon} alt="icon" />
            )}
        </div>
    );
};

export default FormField;
