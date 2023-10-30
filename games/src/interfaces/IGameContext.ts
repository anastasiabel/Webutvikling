import ICharacter from "./ICharacter";
import IGame from "./IGame";

interface IGameContext {
    games: IGame[];
    characters: ICharacter[];
    getGameById: (id: number) => void,
    getGamesByTitle: (title: string) => void,
    getGamesByPlatform: (platform: string) => void,
    deleteGameById: (id: number) => void;
    getCharactersByGameId: (gameId: number) => void;
    editGame: (game: IGame) => Promise<IGame>;
    createGame: (game: IGame) => Promise<IGame>,
    deleteCharacterById: (id: number) => void;
}

export default IGameContext;