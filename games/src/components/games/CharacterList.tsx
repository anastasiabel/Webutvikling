import {useContext, useEffect, useState} from "react";
import IGameContext from "../../interfaces/IGameContext";
import { GameContext } from "../../contexts/GameContext";
import GameItem from "./GameItem";
import CharacterItem from "./CharacterItem ";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa9, faPlusSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

interface CharacterListProps {
    gameId?: string;
}

const CharacterList = ({ gameId } : CharacterListProps) => {
    const { characters, getCharactersByGameId } = useContext(GameContext) as IGameContext;

    useEffect(()=>{
        let gameIdNumber = -1;
        if (gameId) {
            gameIdNumber = parseInt(gameId);
        }
        getCharactersByGameId(gameIdNumber);
    }, [])

    const getCharacters = () => {
        return characters.map( (character, i) => (
            <div className="col-lg-4 col-md-6" style={{ marginBottom: '20px' }}>
                <CharacterItem
                    key={`character-${character.id}`}
                    id={character.id}
                    name={character.name}
                    image={character.image}
                />
            </div>
        ));
    }

    return (
        <section>
            <hr/>
            <h3>Characters</h3>
            <div className="container text-center">
                <div className="row">
                    {characters.length > 0 ? getCharacters() : 'No characters in this game'}
                    <div className="col-lg-4 col-md-6" style={{ verticalAlign: 'middle', marginBottom: '20px', margin: '0 auto' }}>
                        <FontAwesomeIcon size={"10x"} icon={faPlusSquare} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CharacterList;