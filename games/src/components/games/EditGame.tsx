import { ChangeEvent, FC, useContext, useState } from "react";
import { GameContext } from "../../contexts/GameContext";
import IEditGame from "../../interfaces/IEditGame";
import IGame from "../../interfaces/IGame";
import IGameContext from "../../interfaces/IGameContext";

const EditGame = ({setIsEdit, game } : IEditGame ) => {

    //const { id, title, releaseYear, description, image, platform } = game;
    const title = game?.title || '';
    const platform = game?.platform || '';
    const id = game?.id || -1;
    const description = game?.description || '';
    const image = game?.image || '';
    const releaseYear = game?.releaseYear || 2000;

    const [newTitle, setNewTitle] = useState<string>(title);
    const [newPlatform, setNewPlatform] = useState<string>(platform);
    const [newReleaseYear, setNewReleaseYear] = useState<number>(releaseYear);
    const [newDescription, setNewDescription] = useState<string>(description);

    const { editGame } = useContext(GameContext) as IGameContext;

    // https://stackoverflow.com/a/48176960
    const saveGame = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        editGame( { id, title: newTitle, image, description: newDescription, releaseYear: newReleaseYear, platform: newPlatform } );
        setIsEdit(false);
    }

    return (
        <div style={{ padding: '10px' }}>
            <hr/>
            <form>
                <div className="form-group mb-2">
                    <label>Title</label>
                    <input id="title" type="text" value={newTitle}
                        onChange={(e) => setNewTitle(e.currentTarget.value)}
                        className="form-control" placeholder="Game title" />
                </div>
                <div className="form-group mb-2">
                    <label>Platform</label>
                    <select
                        defaultValue={newPlatform}
                        className="form-select"
                        onChange={(e) => setNewPlatform(e.target.value)} >
                            <option value="">Choose platform...</option>
                            <option value="PlayStation">PlayStation</option>
                            <option value="PC">PC</option>
                            <option value="XBox">XBox</option>
                            <option value="Nintendo">Nintendo</option>
                    </select>
                </div>
                <div className="form-group mb-2">
                    <label>Release Year</label>
                    <input id="releaseYear" type="number" value={newReleaseYear}
                    //https://stackoverflow.com/a/56801378
                        onChange={(e) => setNewReleaseYear(+e.currentTarget.value)}
                        className="form-control" placeholder="Game release year" />
                </div>
                <div className="form-group mb-2">
                    <label>Description</label>
                    <textarea id="description" rows={3} value={newDescription}
                        onChange={(e) => setNewDescription(e.currentTarget.value)}
                        className="form-control" placeholder="Game description" />
                </div>
                {/* <div className="mb-3">
                    <label className="form-label">Upload game image</label>
                    <input className="form-control" type="file" id="formFile"/>
                </div> */}
                <br />
                <div className="clearfix">
                    <button onClick={saveGame} type="submit" className="btn btn-primary me-1 ms-1 float-end">
                        Save
                    </button>
                    <button onClick={() => setIsEdit(false)}className="btn btn-light float-end">Cancel</button>
                </div>
            </form>
        </div>
    );
}


export default EditGame;