import { FC } from "react";
import IGame from "./IGame";

// Idiotisk interface
interface IEditGame {
    game?: IGame,
    setIsEdit: (isEdit: boolean) => void;
}

export default IEditGame;