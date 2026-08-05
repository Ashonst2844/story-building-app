import Button from "./Button";
import Modals from "./Modals";
import Image from "./Image";
import Badge from "./Badge";
import ChapterList from "./ChapterList";
import Forms from "./Forms";

import React from "react";
import { useForm } from "../../assets/hooks/useForm";

interface ChapterProps {
    name:string;
    status:boolean;
}

interface CardsProps {
    //Main Props
    use: "characters"|"books";
    onClick?:()=>void;
    children:React.ReactNode;
    [key: string]: string | number | boolean | React.ReactNode | undefined | ((...args: unknown[]) => void) | ChapterProps[];
}

function Cards({use, onClick, children, ...rest}: CardsProps) {
    const isAdmin = import.meta.env.DEV
    const [state, setState] = React.useState<boolean>(false)

    const [showForm, setShowForm] = React.useState<boolean>(false)
    const {onSubmit} = useForm(["name"])


    const handleDelete = async () => {
        const resource = use==="characters"?"characters":"books"
        const id = use==="characters"?rest.CharId:rest.BookId
        const name = use==="characters"?rest.name:rest.title

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

    return <div className="flex p-2 bg-(--primary) flex-col justify-between gap-2 max-h-75">
        {children}
        <div className="flex w-full h-8 gap-2">
            <Button theme="primary" onClick={()=>setState(true)} type="button" style={{width:isAdmin?"90%":"100%"}}>Details</Button>
            {isAdmin && (
            <Button type="button" theme="warning" onClick={()=>handleDelete()} className="w-[10%]">
                <Image type="icon" name="plus" className="scale-25 rotate-45"/>
            </Button>)}
        </div>

        <Modals isOpen={state} onClose={()=>setState(false)}>
            {use==="characters" ? <div className="flex flex-col gap-4 w-[90%] h-auto lg:w-[50%] bg-(--primary) p-4 z-40">
                <h2 className="text-2xl">{rest.name as string}</h2>
                <hr className="border-2 border-(--accent)"/>
                <div>
                    <p>Age: {rest.age as string ?? "-"}</p>
                    <p>Gender: {rest.gender as string ?? "-"}</p>
                    <p>Faction: {rest.faction as string ?? "-"}</p>
                    <p>Description: {rest.bio as string ?? "-"}</p>
                </div>
            </div> 
            : <>
            <div className="flex w-[90%] h-auto lg:w-[50%] bg-(--primary) p-4 z-40 flex-col gap-4">
                <h2 className="text-2xl">{rest.title as string ?? ""}</h2>
                <div className="center gap-4">
                    {(rest.genres as string[] ?? []).map((genre,index)=><Badge key={index} name={genre}/>)}
                </div>
                <p className="text-justify">{`"${rest.synopsys as string ?? ""}"`}</p>
                <Button type="link" w="100%" h="64px" theme="primary" url={rest.url as string ?? ""}>Read This Book!</Button>
            </div>
            <div className="grid grid-cols-2 overflow-scroll w-[90%] h-[40%] lg:w-[50%] bg-(--primary) p-4 z-40 gap-2">
                {((rest.chapters as ChapterProps[]) ?? []).map((chap,index)=>{
                    if(chap.status) {
                        return <ChapterList BookId={rest.BookId as number} index={index} name={chap.name} status={chap.status}/>
                    } else if(isAdmin) {
                        return <ChapterList BookId={rest.BookId as number} index={index} name={chap.name} status={chap.status}/>
                    }
                    return null;
                })}
                {isAdmin && <Button type="button" theme="secondary" h="64px" onClick={()=>setShowForm(true)}>
                    <Image type="icon" name="plus" className="scale-25"/>
                </Button>}  
            </div></> }
        </Modals>
        <Forms isOpen={showForm} onClose={()=>setShowForm(false)} id="create-chapter" onSubmit={(e)=>onSubmit(e, `http://localhost:5000/api/books/${rest.BookId!}/chapters`)}>
            <Forms.Input type="text" name="name" placeholder="Name:" required/>
        </Forms>
    </div>
}
export default Cards;