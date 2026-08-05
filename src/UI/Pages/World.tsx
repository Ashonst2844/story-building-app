import Button from "../Components/Button";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import Image from "../Components/Image";

import { useFetch } from "../../assets/hooks/useFetch";
import * as ReactDOM from "react-router-dom"

interface WorldProps {
    era:string;
    map:ContinentProps[];
}
interface ContinentProps {
    continent:string;
    description:string;
    country:CountryProps[];
}
interface CountryProps {
    name:string;
    description:string;
    place:string[];
}

function World() {
    const {data:worlds, loading, error} = useFetch<WorldProps>("timelines", false);
    console.log(worlds)
    
    if(loading) {
        return <Loading message="Loading Worlds..."/>
    } else if(error) {
        return <Error message={error.message}/>
    }
    return <section>
        <div className="flex w-full h-16 gap-2 justify-start overflow-x-scroll">
            {worlds?.map((world, i)=> (
                <Button link={`/world/`+world.era.toString()} key={i} theme="primary" type="link" className="min-w-[25%] h-full shrink-0">{world.era}</Button>
            ))}
        </div>
        <ReactDOM.Routes>
            {worlds?.map((world,i)=>(
                <ReactDOM.Route path={`/${world.era}/*`} element={
                    <div className="w-full h-full flex flex-col gap-2 overflow-scroll lg:flex-row lg:h-[calc(100%-64px)]">
                        <div key={i} className="flex flex-row w-full bg-(--primary) h-16 gap-2 lg:h-full lg:flex-col lg:p-2 lg:w-[30%] overflow-y-scroll">
                            <Button theme="secondary" link={`/world/${world.era}/era-globe`} type="link" className="h-auto min-w-[25%] lg:min-h-36 lg:w-full">
                                Globe
                            </Button>
                            {world.map.map((continent, j)=> <Button theme="secondary" link={`/world/${world.era}/`+continent.continent.toString()} key={j} type="link" className="h-auto min-w-[25%] lg:min-h-36 lg:w-full">
                                {continent.continent}
                            </Button>
                            )}
                        </div>
                        <div className="w-full h-[calc(100%-64px)] lg:h-full lg:w-[70%]">
                            <ReactDOM.Routes>
                                <ReactDOM.Route path={'era-globe'} element={<Image type="map" name={world.era} w="100%" h="100%" src={`/Images/Map/${world.era}/globe.jpeg`} zoom/>}/>
                                {world.map.map((continent)=> 
                                    <ReactDOM.Route path={`${continent.continent}`} element={
                                        <div className="w-full h-full flex flex-col gap-2 p-2 overflow-y-scroll">
                                            <div className="center">
                                                <h1>{continent.continent.toUpperCase()}</h1>
                                                <Image type="normal" name={continent.continent} src={`/Images/Map/${world.era}/${continent.continent.toLowerCase()}.webp`} style={{width:"30%"}}/>
                                            </div>
                                            <p style={{fontStyle:"italic"}}>"{continent.description}"</p>
                                            {continent.country.map((country)=>(
                                                <div>
                                                    <h3 className="text-xl m-2 font-bold">{country.name}</h3>
                                                    <p>{country.description}</p>
                                                    <span className="m-2">Discovered Place :</span>
                                                    <p className="italic">{country.place?.filter(Boolean).length > 0 ? country.place.filter(Boolean).join(", ") : "No place discovered, yet"}</p>
                                                </div>
                                            ))}
                                        </div>
                                    }/>
                                )}
                            </ReactDOM.Routes>
                        </div>
                    </div>
                }/>
            ))}
        </ReactDOM.Routes>
    </section>
}
export default World;