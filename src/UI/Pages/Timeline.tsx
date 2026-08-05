import Button from "../Components/Button"
import Loading from "../Components/Loading";
import Error from "../Components/Error";

import { useFetch } from "../../assets/hooks/useFetch"
import * as ReactDOM from "react-router-dom"

interface TimelineProps {
    TimeId:number;
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
        <section className="w-full h-full flex flex-col gap-2 overflow-scroll lg:flex-row lg:h-[calc(100%-64px)]">
            <div className="flex flex-row w-full bg-(--primary) h-16 gap-2 lg:h-full lg:flex-col lg:p-2 lg:w-[30%] overflow-y-scroll">
                {(timelines ?? []).map((time)=><Button link={`/timeline/`+time.TimeId.toString()} key={time.TimeId} type="link" className="h-auto flex flex-col min-w-[35%] lg:min-h-36 lg:w-full">
                    <h3 className="desktop-mode">{time.title}</h3>
                    <p>{time.era}</p>
                </Button>)}
            </div>
            <div className="p-4 w-full lg:w-[70%]">
                <ReactDOM.Routes>
                    {(timelines ?? []).map((time)=><ReactDOM.Route key={time.TimeId} path={`/${time.TimeId}`} element={
                        <div className="flex flex-col gap-4">
                            <h1 className="text-3xl font-black">{time.title}</h1>
                            <hr className="border-2 border-(--accent)"/>
                            <h3 className="font-bold">{time.era}</h3>
                            <p className="text-justify">{time.description}</p>
                            <h3>Novel yang terkait:</h3>
                            <ul>
                                {time.related_novel.map((novel, index) => <li key={index}>{novel}</li>)}
                            </ul>
                        </div>
                    }/>)}
                </ReactDOM.Routes>
            </div>
        </section>
    )
}
export default Timeline