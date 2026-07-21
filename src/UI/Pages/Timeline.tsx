import Button from "../Components/Button"
import Loading from "../Components/Loading";
import Error from "../Components/Error";

import { useFetch } from "../../assets/hooks/useFetch"
import * as ReactDOM from "react-router-dom"

interface TimelineProps {
    TimeId:string;
    title:string;
    description:string;
    era:string;
    related_novel:string[]
}

function Timeline() {
    const {data: timelines, loading, error} = useFetch<TimelineProps>("timelines", false)

    if(loading){
        return <Loading message="loading Timelines..."/>
    } else if(error) {
        return <Error message={error.message}/>
    }
    return(
        <section id="timeline" className="center">
            <div id="timeline-button-container">
                {(timelines ?? []).map((time)=>(
                    <Button link={`/timeline/`+time.TimeId.toString()} key={time.TimeId} type="link" w="100%" h="150px" forNav>
                        <h3 style={{fontSize:"0.9rem", textAlign:"center"}}>{time.title}</h3>
                        <p className="desktop-mode">{time.era}</p>
                    </Button>
                ))}
            </div>
            <div id="timeline-content-container">
                <ReactDOM.Routes>
                    {(timelines ?? []).map((time)=>(
                        <ReactDOM.Route key={time.TimeId} path={`/${time.TimeId}`} element={
                            <div className="times-content">
                                <h1>{time.title}</h1>
                                <hr style={{border:"1px solid var(--accent)"}}/>
                                <h3 style={{margin:"var(--spacing) 0"}}>{time.era}</h3>
                                <p style={{textAlign:"justify"}}>{time.description}</p>
                                <h3 style={{margin:"var(--spacing) 0"}}>Novel yang terkait:</h3>
                                <ul>
                                    {time.related_novel.map((novel, index) => (
                                        <li key={index}>{novel}</li>
                                    ))}
                                </ul>
                            </div>
                        }/>
                    ))}
                </ReactDOM.Routes>
            </div>
        </section>
    )
}
export default Timeline