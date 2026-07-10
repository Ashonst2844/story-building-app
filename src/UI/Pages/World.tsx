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
    const {data:worlds, loading, error} = useFetch<WorldProps>("worlds", false);
    console.log(worlds)
    
    if(loading) {
        return <Loading message="Loading Worlds..."/>
    } else if(error) {
        return <Error message={error.message}/>
    }
    return <div id="world" className="full-page pages">
        <div id="world-tab" className="tab-group center">
            {worlds?.map((world, i)=> (
                <Button link={`/world/`+world.era.toString()} key={i} theme="primary" type="link" w="130px" h="100%">
                    {world.era}
                </Button>
            ))}
        </div>
        <ReactDOM.Routes>
            {worlds?.map((world,i)=>(
                <ReactDOM.Route path={`/${world.era}/*`} element={
                    <div className="world-box">
                        <div key={i} id="continent-button-container">
                            <Button link={`/world/${world.era}/era-globe`} type="link" w="100%" h="25%" forNav>
                                Globe
                            </Button>
                            {world.map.map((continent, j)=> (
                                <Button link={`/world/${world.era}/`+continent.continent.toString()} key={j} type="link" w="100%" h="25%" forNav>
                                    {continent.continent}
                                </Button>
                            ))}
                        </div>
                        <ReactDOM.Routes>
                            <ReactDOM.Route path={'era-globe'} element={
                                <Image w="70%" h="100%" src={`/Images/Map/${world.era}/globe.jpeg`} zoom/>
                            }/>
                            {world.map.map((continent)=> 
                                <ReactDOM.Route path={`${continent.continent}`} element={
                                    <div className="continent-box">
                                        <div className="continent-header center">
                                            <h1 style={{
                                                color:"white"}}>{continent.continent.toUpperCase()}</h1>
                                            <img style={{
                                                width:"30%"
                                            }} src={`/Images/Map/${world.era}/${continent.continent.toLowerCase()}.webp`} />
                                        </div>
                                        <p style={{fontStyle:"italic"}}>"{continent.description}"</p>
                                        {continent.country.map((country)=>(
                                            <>
                                                <h3 style={{margin:"var(--spacing) 0"}}>{country.name}</h3>
                                                <p>{country.description}</p>
                                                <span style={{margin:"calc(var(--spacing)/2) 0", fontWeight:"700", display:"block"}}>Discovered Place :</span>
                                                <p style={{fontStyle:"italic"}}>{country.place?.filter(Boolean).length > 0 ? country.place.filter(Boolean).join(", ") : "No place discovered, yet"}</p>
                                            </>
                                        ))}
                                    </div>
                                }/>
                            )}
                        </ReactDOM.Routes>
                    </div>
                }/>
            ))}
        </ReactDOM.Routes>
    </div>
}
export default World;