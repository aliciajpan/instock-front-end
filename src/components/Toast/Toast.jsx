import "./Toast.scss";
import { useState, useEffect } from "react";
import closeIcon from "../../assets/icons/close-24px.svg";

const Toast = ({ message, status, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const handleClose = () => {
        setIsVisible(false);
        onClose();
    };
    
    useEffect(() => {
        if (status === "success" || status === "error") {
        setIsVisible(true);
        setTimeout(() => {
            handleClose();
        }, 3000);
        }
    }, [status, handleClose]);

    return (
        isVisible && (
        <div className={`toast toast--${status}`}>
            <div className="toast__message">{message}</div>
            <div className="toast__close" onClick={() => handleClose()}>
            <img className="toast__close-icon" src={closeIcon} alt="Close" />
            </div>
        </div>
        )
    );
};

export default Toast;