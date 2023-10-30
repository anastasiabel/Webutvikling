import { useContext } from "react";
import CreateGame from "../components/games/CreateGame";
import EditGame from "../components/games/EditGame";
import GameList from "../components/games/GameList";
import { GameContext } from "../contexts/GameContext";
import GamePage from "./GamePage"

const CreateGamePage = () => {
    return (
        <CreateGame/>
    )
};

export default CreateGamePage;
