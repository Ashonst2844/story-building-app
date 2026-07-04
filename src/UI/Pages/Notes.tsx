import Loading from "../Components/Loading";
import Accordion from "../Components/Accordion";

import { useFetch } from "../../assets/hooks/useFetch";

interface NotesProps {
    head:string;
    type:"list"|"desc";
    body:string[];
}

function Notes() {
    const {data:notes, loading, error} = useFetch<NotesProps>("http://localhost:5000/api/note","none")
    console.log(error)

    if(loading){
        return <Loading message="Loading Notes..."/>
    }
    return(
        <div id="notes" className="full-page pages">
            <h2 className="page-header">ADMIN NOTES</h2>
            <div id="note-container" className="accordion-container">
                {notes.map((note,index)=>(
                    <Accordion key={index} use="notes" type={note.type} head={note.head} body={note.body}/>
                ))}
            </div>
        </div>
    )
}
export default Notes