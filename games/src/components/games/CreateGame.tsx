import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../contexts/GameContext";
import IEditGame from "../../interfaces/IEditGame";
import IGame from "../../interfaces/IGame";
import IGameContext from "../../interfaces/IGameContext";
import ImageUploadService from "../../services/ImageUploadService";


const CreateGame = () => {

    const { createGame } = useContext(GameContext) as IGameContext;
    const navigate = useNavigate(); 

    const [newTitle, setNewTitle] = useState<string>('');
    const [newPlatform, setNewPlatform] = useState<string>('');
    const [newReleaseYear, setNewReleaseYear] = useState<null|number>(0);
    const [newDescription, setNewDescription] = useState<string>('');
    const [newImage, setNewImage] = useState<File | null>(null);

    const [uploaded, setUploaded] = useState<boolean>(false);

    const setImageHandler = (e: ChangeEvent<HTMLInputElement> ) => {
        const {files} = e.target;
    
        if (files!=null) {
          const file = files[0];
          setNewImage(file);
          setUploaded(false);
        }
    }
    
    const uploadImage = (e : React.FormEvent<EventTarget>) => {
        e.preventDefault();
        if (newImage != null) {
            ImageUploadService.uploadImage(newImage);
            setUploaded(true);
        }
      }


    // IMAGE IS READ BY TO https://localhost:7053/images/edit.task.png

    const saveGame = () => {
        const game = {
            title: newTitle,
            platform: newPlatform,
            releaseYear: newReleaseYear,
            description: newDescription,
            image: newImage?.name || ''
        };
        createGame(game);
        navigate('/');
    }

    return (
        <section>
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
                    <input id="releaseYear" type="number" value={newReleaseYear?.toString()}
                        onChange={(e) => setNewReleaseYear(parseInt(e.currentTarget.value))}
                        className="form-control" placeholder="Game release year" />
                </div>
                <div className="form-group mb-2">
                    <label>Description</label>
                    <textarea id="description" rows={3} value={newDescription}
                        onChange={(e) => setNewDescription(e.currentTarget.value)}
                        className="form-control" placeholder="Game description" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Upload game image</label>
                    <div>
                        <input className="form-control mb-2" onChange={setImageHandler} type="file" />
                        <button type="button" className="btn btn-primary" onClick={(e) => uploadImage(e)}>Upload file</button>
                        {uploaded && <span className="ms-2">Uploaded!</span>}
                    </div>
                </div>
                <br />
                <div className="clearfix">
                    <button onClick={saveGame} type="submit" className="btn btn-primary me-1 ms-1 float-end">Save</button>
                    <button onClick={() => navigate('/')}className="btn btn-light float-end">Cancel</button>
                </div>
            </form>
        </section>
)};

export default CreateGame;
