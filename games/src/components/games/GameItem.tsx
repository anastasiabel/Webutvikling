import { useNavigate } from "react-router-dom";
import IGame from "../../interfaces/IGame";
import { IMG_FOLDER } from "../../services/ImageUploadService";
import { trim } from "../../utils/utils";

const GameItem = ({id, title, image, description, releaseYear, platform} : IGame) => {

    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/game/${id}`)} className="card" style={{ cursor: 'pointer', maxWidth: '340px', height: '420px'}}>
            <img height={245} src={`${IMG_FOLDER}/${image}`} className="card-img-top" alt="Icon is missing" />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                    {trim(80, description)}
                </p>
                <p>
                    <span className="badge text-bg-info" style={{marginRight: '8px'}}>{platform}</span>
                    <span className="badge text-bg-warning">{releaseYear}</span>
                </p>
            </div>
        </div>
    );
}

export default GameItem;