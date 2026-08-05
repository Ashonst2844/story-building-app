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

interface WikiProps {
    head:string;
    body:string;
}

function Wiki() {
    const isAdmin = import.meta.env.DEV
    const [showForm, setShowForm] = useState<boolean>(false)
    const {onSubmit} = useForm(["head","body"])
    const [searchQ, setSearchQ] = useState("")

    const {data:wikis, loading, error} = useFetch<WikiProps>("wikis",false)

    if(loading){
        return <Loading message="Loading Wiki..."/>
    } else if(error) {
        return <Error message={error.message}/>
    }
    return(
        <section className="flex flex-col">
            <Heading use="wiki" value={searchQ} 
            onChange={(e)=>setSearchQ(e.target.value)} 
            onSubmit={(e)=>{e.preventDefault(); setSearchQ(searchQ)}}/>
            <div className="flex flex-col gap-4 p-2 overflow-scroll">
                {(wikis ?? []).map((wiki,index)=> wiki.head.toLowerCase().startsWith(searchQ) && <Accordion key={index} head={wiki.head} body={wiki.body}/>)}
                {isAdmin && <Button onClick={()=>setShowForm(true)} w="4rem" h="4rem" className="rounded-full absolute m-4 right-0 bottom-16 lg:bottom-0" type="button" theme="secondary">
                    <Image type="icon" name="plus" className="scale-50"/>
                </Button>}
            </div>
            <Forms isOpen={showForm} onClose={()=>setShowForm(false)} id="create-wikis" onSubmit={(e)=>onSubmit(e, "http://localhost:5000/api/wikis")}>
                <Forms.Input type="text" name="head" placeholder="Title:" required/>
                <Forms.Input type="textarea" name="body" placeholder="Content:" required/>
            </Forms>
        </section>
    )
}
export default Wiki