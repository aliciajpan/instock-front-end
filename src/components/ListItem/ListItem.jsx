import { Link } from "react-router-dom";
import chevronRightIcon from "../../assets/icons/chevron_right-24px.svg";
import "./ListItem.scss";

const ListItem = ({ properties, actions }) => {
    return (
        <div className="list-item">
            <div className="list-item__info">
                {properties.map((property) => (
                    <>
                    <div className="list-item__property">
                        <p className="list-item__property-name">
                            {property.name}
                        </p>

                        {property.valueHtml && (
                            <div
                                className="list-item__property-value"
                                dangerouslySetInnerHTML={{
                                    __html: property.valueHtml,
                                }}
                            />
                        )}

                        {property.value && (
                            <p className="list-item__property-value">
                                {property.link ? (
                                    <Link
                                        to={property.link}
                                        className="list-item__property-value-link"
                                    >
                                        <span className="list-item__property-value-text">
                                            {property.value}
                                        </span>
                                        <img
                                            className="list-item__property-value-icon"
                                            src={chevronRightIcon}
                                            alt="chevron-right"
                                        />
                                    </Link>
                                ) : (
                                    <span className="list-item__property-value-text">
                                        {property.value}
                                    </span>
                                )}
                            </p>
                        )}
                    </div>
                </>
            ))}
            </div>
            <div className="list-item__actions">
                {actions.map((action) => (
                    <img
                        src={action.icon}
                        alt={action.name}
                        onClick={action.onClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default ListItem;
