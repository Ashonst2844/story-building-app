import Loading from "../Components/Loading";
import Error from "../Components/Error";
import Accordion from "../Components/Accordion";
import Button from "../Components/Button";
import Image from "../Components/Image";
import Forms from "../Components/Forms";

import { useFetch } from "../../assets/hooks/useFetch";
import { useForm } from "../../assets/hooks/useForm";
import { useState } from "react"

interface WikiProps {
    head:string;
    type:"list"|"desc"
    body:string;
}

function Wiki() {
    const isAdmin = import.meta.env.DEV
    const [showForm, setShowForm] = useState<boolean>(false)
    const {onSubmit} = useForm(["head","type","body"])

    const {data:wikis, loading, error} = useFetch<WikiProps>("wikis",false)
    if(loading){
        return <Loading message="Loading Wiki..."/>
    } else if(error) {
        return <Error message={error.message}/>
    }
    return(
        <div id="wiki" className="full-page pages">
            <h2 className="page-header">SINS SAGA WIKI / ENCYCLOPEDIA</h2>
            <div id="wiki-container" className="accordion-container">
                {(wikis ?? []).map((wiki,index)=>(
                    <Accordion key={index} use="wiki" type={wiki.type} head={wiki.head} body={wiki.body}/>
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
            <Forms isOpen={showForm} onClose={()=>setShowForm(false)} id="create-wikis" onSubmit={(e)=>onSubmit(e, "http://localhost:5000/api/wikis")}>
                <Forms.Input type="text" name="title" placeholder="Title:" required/>
                <Forms.Input type="list" name="title" placeholder="Title:" lists={["desc","list"]} required/>
                <Forms.Input type="textarea" name="content" placeholder="Content:" required/>
            </Forms>
        </div>
    )
}
export default Wiki