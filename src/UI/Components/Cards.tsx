import Button from "./Button";
import Modals from "./Modals";

import React from "react";

interface CardsProps {
    //Main Props
    use: "characters"|"books";
    onClick?:()=>void;
    //Character Props
    id?:string;
    name?:string;
    age?:number;
    gender?:string;
    faction?:string;
    bio?:string;
    //Book Props
    cover?:string;
    link?:string;
    title?:string;
    genres?:string[];
    synopsys?:string;
}

function Cards({ use, id, name, age, gender, faction, bio, title, cover, link, genres, synopsys }: CardsProps) {
    const isAdmin = import.meta.env.DEV
    const [state, setState] = React.useState(false)

    const handleDelete = async () => {
        if (window.confirm(`Delete "${name}"?`)) {
            try {
                const response = await fetch(`http://localhost:5000/api/characters/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert("Character Deleted!");
                    window.location.reload();
                } else {
                    alert("Failed To Delete.");
                }
            } catch (error) {
                console.error("Error While Deleting...:", error);
                alert("Something WrongQ.");
            }
        }
    }

    if (use==="characters") {
        return(
            <div className={`center ${use}-card`}>
                <h3>{name}</h3>
                <img src="/Images/Icons/human.svg"/>
                <div className="button-group center">
                    <Button onClick={()=>setState(true)} theme="primary" w={isAdmin?"70%":"100%"} h="40px" type="button">
                        <p>Details</p>
                    </Button>
                    {isAdmin && (
                        <Button onClick={handleDelete} theme="warning"  w="30%" h="40px" type="button">
                            <img style={{rotate:"45deg", width:"20px"}} src="/Images/Icons/plus.svg"/>
                        </Button>
                    )}
                </div>
                <Modals isOpen={state} onClose={()=>setState(false)} use={use} 
                name={name} 
                age={age} 
                gender={gender} 
                faction={faction} 
                bio={bio}  />
            </div>
        )    
    } else if (use==="books") {
        return(
            <div className={`center ${use}-card`}>
                <img className="full-page" src={`/Images/Cover/${cover}`} alt={title} onClick={
                    () => setState(true)
                } />
                <Modals isOpen={state} onClose={()=>setState(false)} use={use}
                title={title}
                genres={genres}
                synopsys={synopsys}
                url={link}/>
            </div>
        )
    }
}
export default Cards;