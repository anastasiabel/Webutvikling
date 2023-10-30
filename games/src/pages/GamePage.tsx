import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CharacterList from "../components/games/CharacterList";
import EditGame from "../components/games/EditGame";
import { GameContext } from "../contexts/GameContext";
import IGameContext from "../interfaces/IGameContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons'


const GamePage = () => {
    let { id } = useParams();
    const { games, deleteGameById } = useContext(GameContext) as IGameContext;
    const game = games.filter(g => g.id?.toString() === id)[0];

    const navigate = useNavigate(); 
      
    const deleteGame = () => {
        if (!!id && window.confirm('Are you sure you want to delete the game?')) {
            deleteGameById(parseInt(id));
            navigate('/');
        }
    }
    
    const [isEdit, setIsEdit] = useState(id ? false : true);
    return (
        <section>
            {game &&
            <div className="row">
                <div className="col-10">
                    <h3>{game?.title}</h3>   
                    <div>
                    <strong>About:</strong> <i>{game?.description}</i>
                    </div>
                    <div><strong>Runs on:</strong> {game?.platform}</div>
                    <div><strong>Released:</strong> {game?.releaseYear}</div>
                </div>
                {!isEdit &&  // show delete&edit buttons only in view mode
                    <div className="col-2">
                        <button onClick={()=>deleteGame()} type="button" className="btn btn-danger me-1 ms-1 float-end">
                            <FontAwesomeIcon icon={faTrashCan} /> Delete
                        </button>
                        <button onClick={()=> setIsEdit(true)} type="button" className="btn btn-primary me-1 ms-1 float-end">
                            <FontAwesomeIcon icon={faEdit} /> Edit
                        </button>
                    </div>
                }
            </div>
            }
            
            {isEdit && 
                <EditGame
                    setIsEdit={setIsEdit}
                    game={game}/>}
            
            <CharacterList gameId={id}/>
        </section>
    )
}

export default GamePage;
