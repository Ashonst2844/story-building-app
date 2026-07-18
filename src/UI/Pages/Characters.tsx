import Cards from "../Components/Cards";
import Button from "../Components/Button";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import Forms from "../Components/Forms";
import Heading from "../Components/Heading";
import Image from "../Components/Image";

import { useFetch } from "../../assets/hooks/useFetch";
import { useForm } from "../../assets/hooks/useForm"

import React from "react";

interface CharactersProps {
    CharId:string;
    name:string;
    age:number;
    gender:"male"|"female";
    faction:"good"|"neutral"|"evil";
    bio:string;
}

function Characters() {
    const isAdmin = import.meta.env.DEV

    const {data:characters, loading, error} = useFetch<CharactersProps>("characters", false);
    
    const {onSubmit} = useForm(["name","age","gender","faction","bio"])
    const [showForm,setShowForm] = React.useState<boolean>(false)

    const [searchQ, setSearchQ] = React.useState("")

    if(loading) {
        return <Loading message="Loading Characters..."/>
    } else if (error) {
        return <Error message={error.message}/>
    }
    return(
        <section id="characters">
            <Heading use="character" value={searchQ} 
            onChange={(e)=>setSearchQ(e.target.value)} 
            onSubmit={(e)=>{
                e.preventDefault() 
                setSearchQ(searchQ)
            }} />
            <div id="character-container" className="card-container">
                {characters?.map(character => character.name.toLowerCase().startsWith(searchQ) && (
                    <Cards key={character.CharId} use="characters" 
                    CharId={character.CharId}
                    name={character.name}
                    age={character.age} 
                    gender={character.gender} 
                    faction={character.faction} 
                    bio={character.bio}/>
                ))}
                {isAdmin && (
                    <div className="button-group">
                        <Button onClick={()=>setShowForm(true)} type="button" theme="secondary">
                            <Image type="icon" name="plus" style={{
                                width:"50%"
                            }}/>
                        </Button>
                    </div>
                )}
            </div>
            <Forms isOpen={showForm} onClose={()=>setShowForm(false)} id="create-character" onSubmit={(e)=>onSubmit(e, "http://localhost:5000/api/characters")}>
                <Forms.Input type="text" name="name" placeholder="Name:" required/>
                <Forms.Input type="number" name="age" placeholder="Age:" required/>
                <Forms.Input type="list" name="gender" lists={["male","female"]} required/>
                <Forms.Input type="list" name="faction" lists={["good","neutral","evil"]} required/>
                <Forms.Input type="textarea" name="bio" placeholder="Biograph:" required/>
            </Forms>
        </section>
    )
}
export default Characters;