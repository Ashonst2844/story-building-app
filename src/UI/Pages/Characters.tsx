import Cards from "../Components/Cards";
import Button from "../Components/Button";
import Loading from "../Components/Loading";
import Error from "./Error";
import Forms from "../Components/Forms";

import { useFetch } from "../../assets/hooks/useFetch";
import { useForm } from "../../assets/hooks/useForm"

import React from "react";

interface CharactersProps {
    id:string;
    name:string;
    age:number;
    gender:"male"|"female";
    faction:"good"|"neutral"|"evil";
    bio:string;
}

function Characters() {
    const {data:characters, loading, error} = useFetch<CharactersProps>("http://localhost:5000/api/characters", false, "characters");
    
    const {onSubmit} = useForm(["name","age","gender","faction","bio"])
    const [showForm,setShowForm] = React.useState(false)

    if(loading) {
        return <Loading message="Loading Characters..."/>
    } else if (error) {
        return <Error message={error.message}/>
    }
    return(
        <div id="characters" className="full-page pages">
            <h2 className="page-header">SINS SAGA CHARACTERS</h2>
            <div id="character-container" className="card-container">
                {characters?.map((character)=>(
                    <Cards key={character.id} use="characters" 
                    id={character.id}
                    name={character.name} 
                    age={character.age} 
                    gender={character.gender} 
                    faction={character.faction} 
                    bio={character.bio}/>
                ))}
                <Button onClick={()=>setShowForm(true)} w="100%" h="300px" type="button" theme="secondary">
                    <img src="/src/assets/icons/plus.svg"/>
                </Button>
            </div>
            <Forms isOpen={showForm} onClose={()=>setShowForm(false)} id="create-character" onSubmit={(e)=>onSubmit(e, "http://localhost:5000/api/characters")}>
                <Forms.Input type="text" name="name" placeholder="Name:" required/>
                <Forms.Input type="number" name="age" placeholder="Age:" required/>
                <Forms.Input type="list" name="gender" lists={["male","female"]} required/>
                <Forms.Input type="list" name="faction" lists={["good","neutral","evil"]} required/>
                <Forms.Input type="textarea" name="bio" placeholder="Biograph:" required/>
            </Forms>
        </div>
    )
}
export default Characters;