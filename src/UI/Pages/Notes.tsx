import Loading from "../Components/Loading";
import Error from "../Components/Error";
import Accordion from "../Components/Accordion";
import Button from "../Components/Button";
import Image from "../Components/Image";
import Forms from "../Components/Forms";

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
            <div id="notes" className="full-page pages" style={{display:isAdmin?"block":"none"}}>
                <h2 className="page-header" >ADMIN NOTES</h2>
                <div id="note-container" className="accordion-container">
                    {(notes ?? []).map((note,index)=>(
                        <Accordion key={index} head={note.head} body={note.body}/>
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
            </div>
            <Forms isOpen={showForm} onClose={()=>setShowForm(false)} id="create-notes" onSubmit={(e)=>onSubmit(e, "http://localhost:5000/api/notes")}>
                <Forms.Input type="text" name="title" placeholder="Title:" required/>
                <Forms.Input type="textarea" name="content" placeholder="Content:" required/>
            </Forms>
        </>
    )
}
export default Notes