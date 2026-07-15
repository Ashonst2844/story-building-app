import Button from "./Button";
import Modals from "./Modals";
import Image from "./Image";

import React from "react";

interface ChapterProps {
    name:string;
    status:boolean;
}

interface CardsProps {
    //Main Props
    use: "characters"|"books";
    onClick?:()=>void;
    //Character Props
    CharId?:string;
    name?:string;
    age?:number;
    gender?:string;
    faction?:string;
    bio?:string;
    //Book Props
    BookId?:string;
    cover?:string;
    link?:string;
    title?:string;
    genres?:string[];
    synopsys?:string;
    chapters?:ChapterProps[];
}

function Cards(props: CardsProps) {
    const isAdmin = import.meta.env.DEV
    const [state, setState] = React.useState(false)

    const handleDelete = async () => {
        const resource = props.use==="characters"?"characters":"books"
        const id = props.use==="characters"?props.CharId:props.BookId
        const name = props.use==="characters"?props.name:props.title

        if (window.confirm(`Delete "${name}"?`)) {
            try {
                const response = await fetch(`http://localhost:5000/api/${resource}/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert(`${resource.toUpperCase()} Deleted!`);
                    window.location.reload();
                } else {
                    alert("Failed To Delete.");
                }
            } catch (error) {
                console.error("Error While Deleting...:", error);
                alert("Something Wrong.");
            }
        }
    }

    return(
        <div className={`center cards`} style={{padding: props.use==="characters"?"var(--spacing)":"0px"}}>
            {props.use==="characters" ? (
                <>
                    <h3>{props.name}</h3>
                    <Image type="icon" name="human"/>
                    <div className="center" style={{gap:"calc(var(--spacing)/2)",width:"100%"}}>
                        <Button onClick={()=>setState(true)} theme="primary" h="40px" type="button">Details</Button>
                        {isAdmin && (
                        <Button type="button" theme="warning" onClick={handleDelete} h="40px" w="40%">
                            <Image type="icon" name="plus" style={{
                                width:"30%", transform:"rotate(45deg)"
                            }}/>
                        </Button>)}
                    </div>
                </>
            ) : props.use==="books" ? (
                <>
                    <Image type="normal" name={props.cover ?? ""} src={props.cover ? `Images/Cover/${props.cover}` : ""} style={{
                        width:"100%",
                        margin:"auto"
                    }} onClick={()=>setState(true)}/>
                </>
            ) : ""}

            <Modals isOpen={state} onClose={()=>setState(false)} use={props.use} 
            // Character Modal
            name={props.name} 
            age={props.age} 
            gender={props.gender} 
            faction={props.faction} 
            bio={props.bio}
            // Book Modal
            BookId={props.BookId}
            title={props.title}
            genres={props.genres}
            synopsys={props.synopsys}
            url={props.link}
            chapters={props.chapters}
            />
        </div>
    )
}
export default Cards;