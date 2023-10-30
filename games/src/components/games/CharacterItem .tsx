import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import ICharacter from "../../interfaces/ICharacter";
import IGameContext from "../../interfaces/IGameContext";
import { IMG_FOLDER } from "../../services/ImageUploadService";

const CharacterItem = ({id, name, image} : ICharacter) => {
    const { characters, deleteCharacterById } = useContext(GameContext) as IGameContext;

    const deleteCharacter = () => {
        if (id && window.confirm('Are you sure you want to delete the character?')) {
            deleteCharacterById(id);
        }
    };

    return (
        <div className="card" style={{ maxWidth: '340px'}}>
            <span style={{ cursor: 'pointer', color: 'white', backgroundColor: 'black', opacity: '0.5', width: '25px', height: '25px', borderRadius: '5px' }} onClick={() => deleteCharacter()} className="position-absolute top-0 end-0">
                <FontAwesomeIcon icon={faTrashCan} />
            </span>
            <img height={245} src={`${IMG_FOLDER}/${image}`} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
            </div>
        </div>
    );
}

export default CharacterItem;