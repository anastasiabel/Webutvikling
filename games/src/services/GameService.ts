import axios from "axios";
import { redirect } from "react-router-dom";
import IGame from "../interfaces/IGame";

const GameService = (
    () => {

        const gamesApiEndpoints = {
            games: "https://localhost:7053/Game"
        }

        const getAll = async () => {
            const result = await axios.get(gamesApiEndpoints.games);
            return result.data;
        }

        const getById = async (id: number) => {
            const result = await axios.get(`${gamesApiEndpoints.games}/${id}`);
            return result.data;
        }

        const getByTitle = async (title: string) => {
            const result = await axios.get(`${gamesApiEndpoints.games}/GetByTitle/${title}`);
            return result.data;
        }

        const getByPlatform = async (platform: string) => {
            const result = await axios.get(`${gamesApiEndpoints.games}/GetByPlatform/${platform}`);
            return result.data;
        }

        const deleteGame = async (id: number) => {
            const result = await axios.delete(`${gamesApiEndpoints.games}/${id}`);
            console.log(result);
            return result;
        }

        const editGame = async (editedGame: IGame) => {
            const result = await axios.put(gamesApiEndpoints.games, editedGame);
            return result.data;
        }

        const createGame = async (createdGame: IGame) => {
            const result = await axios.post(gamesApiEndpoints.games, createdGame);
            return result.data;
        }

        return {
            getAll,
            getById,
            getByTitle,
            getByPlatform,
            deleteGame,
            editGame,
            createGame
        }
    }
)();

export default GameService;