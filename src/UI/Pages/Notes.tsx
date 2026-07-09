import Loading from "../Components/Loading";
import Error from "../Components/Error";
import Accordion from "../Components/Accordion";

import { useFetch } from "../../assets/hooks/useFetch";

interface NotesProps {
    head:string;
    type:"list"|"desc";
    body:string;
}

function Notes() {
    const isAdmin = import.meta.env.DEV
    const {data:notes, loading, error} = useFetch<NotesProps>("notes", false)

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
                        <Accordion key={index} use="notes" type={note.type} head={note.head} body={note.body}/>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Notes