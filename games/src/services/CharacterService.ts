import axios from "axios";
import { redirect } from "react-router-dom";

const CharacterService = (
    () => {

        const charactersApiEndpoints = {
            characters: "https://localhost:7053/Character"
        }

        const getAll = async () => {
            const result = await axios.get(charactersApiEndpoints.characters);
            return result.data;
        }

        const getById = async (id: number) => {
            const result = await axios.get(`${charactersApiEndpoints.characters}/${id}`);
            return result.data;
        }

        const getByGameId = async (gameId: number) => {
            const result = await axios.get(`${charactersApiEndpoints.characters}/GetByGameId/${gameId}`);
            return result.data;
        }

        const deleteCharacterById = async (id: number) => {
            const result = await axios.delete(`${charactersApiEndpoints.characters}/${id}`);
        
            return result;
        }
        

    

        

        return {
            getAll,
            getById,
            getByGameId,
            deleteCharacterById
        }
    }
)();

export default CharacterService;