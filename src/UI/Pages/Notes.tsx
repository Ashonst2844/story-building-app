import Loading from "../Components/Loading";
import Error from "../Components/Error";
import Accordion from "../Components/Accordion";
import Button from "../Components/Button";
import Image from "../Components/Image";
import Forms from "../Components/Forms";
import Heading from "../Components/Heading";

import { useFetch } from "../../assets/hooks/useFetch";
import { useForm } from "../../assets/hooks/useForm";
import { useState } from "react"

interface NotesProps {
    head:string;
    body:string;
}

function Notes() {
    const isAdmin = import.meta.env.DEV
    const {data:notes, loading, error} = useFetch<NotesProps>("notes", false)

    const [showForm, setShowForm] = useState<boolean>(false)
    const {onSubmit} = useForm(["head","body"])
    const [searchQ, setSearchQ] = useState("")

    if(loading){
        return <Loading message="Loading Notes..."/>
    } else if(error) {
        return <Error message={error.message}/>
    }
    return(
        <>
            {!isAdmin && (
                <div className="full-page pages center">
                    <h1>Developers Only!</h1>
                </div>
            )}
            <section className="flex-col" style={{display:isAdmin?"flex":"none"}}>
                <Heading use="notes" value={searchQ} 
                onChange={(e)=>setSearchQ(e.target.value)} 
                onSubmit={(e)=>{e.preventDefault(); setSearchQ(searchQ)}}/>
                <div className="flex flex-col gap-4 p-2 overflow-scroll">
                    {(notes ?? []).map((note,index)=> note.head.toLowerCase().startsWith(searchQ) && <Accordion key={index} head={note.head} body={note.body}/>)}
                    {isAdmin && <Button onClick={()=>setShowForm(true)} w="4rem" h="4rem" className="rounded-full absolute m-4 right-0 bottom-16 lg:bottom-0" type="button" theme="secondary">
                        <Image type="icon" name="plus" className="scale-50"/>
                    </Button>}
                </div>
            </section>
            <Forms isOpen={showForm} onClose={()=>setShowForm(false)} id="create-notes" onSubmit={(e)=>onSubmit(e, "http://localhost:5000/api/notes")}>
                <Forms.Input type="text" name="head" placeholder="Title:" required/>
                <Forms.Input type="textarea" name="body" placeholder="Content:" required/>
            </Forms>
        </>
    )
}
export default Notes