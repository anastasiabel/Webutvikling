import {useContext, useState} from "react";
import IGameContext from "../../interfaces/IGameContext";
import { GameContext } from "../../contexts/GameContext";
import GameItem from "./GameItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


const GameList = () => {
    const [ search, setSearch] = useState<string>('');
    const [ selectState, setSelectState] = useState<string>('');
    
    const { games, getGamesByTitle, getGamesByPlatform } = useContext(GameContext) as IGameContext;

    const searchGamesByTitle = (title: string) => {
        setSelectState('');
        setSearch(title);
        getGamesByTitle(title);
    };

    const searchGamesByPlatform = (platform: string) => {
        setSelectState(platform);
        setSearch('');
        getGamesByPlatform(platform);
    };

    const getGameItems = () => {
        return games.map( (game, i) => (
            <div className="col-lg-4 col-md-6" style={{ marginBottom: '20px' }}>
                <GameItem
                    key={`game-${game.id}`}
                    id={game.id}
                    title={game.title}
                    image={game.image}
                    platform={game.platform}
                    releaseYear={game.releaseYear}
                    description={game.description}
                />
            </div>
        ));
    }

    return (
        <section>
            <div className="row">
                <div className="col-2"><h3>Alle spill</h3></div>
                <div className="col-2">
                    <a href={'/game/new'} className="btn btn-outline-primary">
                        <FontAwesomeIcon className="me-1" icon={faPlus} /> Add new
                    </a>
                </div>
                <div className="col-4">
                    <div className="input-group">
                        <input value={search} onChange={(e) => searchGamesByTitle(e.target.value)} type="text" className="form-control" placeholder="Search" />
                    </div>
                </div>
                <div className="col-4">
                    <select
                        value={selectState}
                        className="form-select"
                        onChange={(e) => searchGamesByPlatform(e.target.value)} >
                        <option value="" selected>Choose platform...</option>
                        <option value="PlayStation">PlayStation</option>
                        <option value="PC">PC</option>
                        <option value="XBox">XBox</option>
                        <option value="Nintendo">Nintendo</option>
                    </select>
                    {/* <button type="button" className="btn btn-link">+ Legg til spill</button> */}
                </div>
            </div>
            <hr/>
            <div className="container text-center">
                <div className="row">
                    {getGameItems()}
                </div>
            </div>
        </section>
    )
}

export default GameList;