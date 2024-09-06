import "./Modal.scss";
import Button from "../Button/Button";
import { useEffect } from "react";

const Modal = ({ isOpen, title, buttons, children }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="modal" style={{ display: isOpen ? "flex" : "none" }}>
            <div className="modal__overlay">
                <div className="modal__content">
                    <h1 className="modal__title">{title}</h1>
                    <div className="modal__body">
                        {children}
                    </div>
                </div>
                <div className="modal__buttons">
                        {buttons &&
                            buttons.map((button) => (
                            <Button key={button.id} onClick={button.onClick} status={button.status} type="button">
                                {button.text}
                            </Button>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;
