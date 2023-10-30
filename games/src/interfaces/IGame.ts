interface IGame {
    id?: number;
    title: string;
    platform: string;
    releaseYear: null|number;
    description?: string;
    image: string;
}

export default IGame;