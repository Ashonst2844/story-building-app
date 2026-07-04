import Loading from "../Components/Loading";
import Error from "./Error";
import Accordion from "../Components/Accordion";

import { useFetch } from "../../assets/hooks/useFetch";

interface WikiProps {
    head:string;
    type:"list"|"desc"
    body:string;
}

function Wiki() {
    const {data:wikis, loading, error} = useFetch<WikiProps>("http://localhost:5000/api/wiki","none")
    if(loading){
        return <Loading message="Loading Wiki..."/>
    } else if(error) {
        return <Error message={error.message}/>
    }
    return(
        <div id="wiki" className="full-page pages">
            <h2 className="page-header">SINS SAGA WIKI / ENCYCLOPEDIA</h2>
            <div id="wiki-container" className="accordion-container">
                {wikis.map((wiki,index)=>(
                    <Accordion key={index} use="wiki" type={wiki.type} head={wiki.head} body={wiki.body}/>
                ))}
            </div>
        </div>
    )
}
export default Wiki