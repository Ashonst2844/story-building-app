import Button from "../Components/Button"
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import Times from "../Components/Times";

import { useFetch } from "../../assets/hooks/useFetch"
import * as ReactDOM from "react-router-dom"

interface TimelineProps {
    id:number;
    title:string;
    time_range:string;
    relatedNovel:string[]
}

function Timeline() {
    const {data: timelines, loading, error} = useFetch<TimelineProps>("timelines", false)

    if(loading){
        return <Loading message="loading Timelines..."/>
    } else if(error) {
        return <Error message={error.message}/>
    }
    return(
        <div id="timeline" className="full-page pages center">
            <div id="timeline-button-container">
                {timelines.map((time)=>(
                    <Button link={time.id.toString()} key={time.id} type="link" w="100%" h="150px" forTimes>
                        <h3>{time.title}</h3>
                        <p>{time.time_range}</p>
                    </Button>
                ))}
            </div>
            <div id="timeline-content-container">
                <ReactDOM.Routes>
                    {timelines.map((time)=>(
                        <ReactDOM.Route key={time.id} path={`/timeline/${time.id.toString()}`} element={<Times/>}/>
                    ))}
                </ReactDOM.Routes>
            </div>
        </div>
    )
}
export default Timeline