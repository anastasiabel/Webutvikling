import { useEffect, useState, createContext, ReactNode } from 'react';
import GameService from '../services/GameService';
import IGameContext from '../interfaces/IGameContext';
import IGame from '../interfaces/IGame';
import CharacterService from '../services/CharacterService';
import ICharacter from '../interfaces/ICharacter';

export const GameContext = createContext<IGameContext | null>(null);

type Props = {
    children: ReactNode
}
const GameProvider = ({children} : Props) => {
    const [games, setGames] = useState<IGame[]>([]);
    const [characters, setCharacters] = useState<ICharacter[]>([]);
   
    useEffect(()=>{
        getGamesFromService();
    }, [])

    const getGamesFromService = async () => {
        const gamesFromService = await GameService.getAll();
        setGames( gamesFromService );
    }

    const getGameById = async (id: number) => {
        const game = await GameService.getById(id);
        setGames([game]);
    }

    const getCharactersByGameId = async (gameId: number) => {
        const characters = await CharacterService.getByGameId(gameId);
        setCharacters(characters);
    }

    const getGamesByTitle = async (title: string) => {
        if (!title) {
            getGamesFromService();
        } else {
            const games = await GameService.getByTitle(title);
            setGames(games);
        }
    }

    const getGamesByPlatform = async (platform: string) => {
        if (!platform) {
            getGamesFromService();
        } else {
            const games = await GameService.getByPlatform(platform);
            setGames(games);
        }
    }

    const deleteGameById = async (id: number) => { // må matche med interface name, funksjon ikke sletter men lar servicen å gjøre dette
        await GameService.deleteGame(id);// db oppdateres men ikke grensesnittet
        const newArray = games.filter( game => game.id !== id ) // fjerning av det objektet man ønsker å slette og ny oppdatert array uten det objektet
        setGames(newArray);
    }

    const editGame = async(game: IGame): Promise<IGame> => {
        // Update backend
        const updatedGame = await GameService.editGame(game);
        // Delete old game from games
        const newGames = games.filter((g) => g.id !== game.id);
        // Push updated game to games
        newGames.push(updatedGame);
        // Set games so that front-end is also updated
        setGames(newGames);

        return updatedGame;
    }
    
    const createGame = async(game: IGame): Promise<IGame> => {
        const createdGame = await GameService.createGame(game);
        setGames([...games, createdGame]);
        return createdGame;
    }

    const deleteCharacterById = async (id: number) => { 
        await CharacterService.deleteCharacterById(id);
        const newArray = characters.filter( character => character.id !== id )
        setCharacters(newArray);
    }

    return (//kan inkludere flere funksjoner direkte koblet til API
        <GameContext.Provider value={{
            games,
            characters,
            deleteGameById,
            getGameById,
            getGamesByTitle,
            getGamesByPlatform,
            getCharactersByGameId,
            editGame,
            createGame,
            deleteCharacterById}}>
            {children}
        </GameContext.Provider>        
    )
}

export default GameProvider;