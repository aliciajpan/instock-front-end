import "./Tag.scss";

const Tag = ({tag, status}) => {
    return (
        <div className={`tag tag--${status}`}>
            {tag}
        </div>
    )
}

export default Tag;