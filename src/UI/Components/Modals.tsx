import Button from "./Button";
import Badge from "./Badge";

interface ModalsProps{
    // Main Props
    use: "characters" | "books";
    isOpen: boolean;
    onClose: ()=>void;

    // Character Props
    name?:string;
    age?:number;
    gender?:string;
    faction?:string;
    bio?:string;

    // Book Props
    title?:string;
    genres?:string[];
    synopsys?:string;
    url?:string;
}

function Modals({ use, isOpen, onClose, name, age, gender, faction, bio, title, genres, synopsys, url }: ModalsProps) {

    if (use === "characters") {
        return(
            <>
                {isOpen && (
                    <div className="modals center float-page">
                        <div className={`${use}-modals modal-box center`}>
                            <h2>{name}</h2>
                            <div className={`${use}-modals-content`}>
                                <p>Age: <span>{age ?? "-"}</span></p>
                                <p>Gender: <span>{gender ?? "-"}</span></p>
                                <p>Faction: <span>{faction ?? "-"}</span></p>
                                <p style={{gridArea:"2/1/3/4"}}>Description: <span>{bio ?? "-"}</span></p>
                            </div>
                        </div>
                        <Button onClick={onClose} type="back-button" theme="primary" w="60px" posX="20px" posY="20px"/>
                    </div>
                )}
            </>
        )   
    } else if (use === "books") {
        return(
            <>
                {isOpen && (
                    <div className="modals center float-page">
                        <div className={`${use}-modals modal-box center`}>
                            <h2>{title}</h2>
                            <div className="badge-group center">
                                {(genres ?? []).map((genre,index)=>(
                                    <Badge key={index} name={genre}/>
                                ))}
                            </div>
                            <p style={{textAlign:"justify", margin:"var(--spacing) 0"}}>"{synopsys}"</p>
                            <Button type="link" w="300px" theme="primary" url={url}>Read This Book!</Button>
                        </div>
                        <Button onClick={onClose} type="back-button" theme="primary" w="60px" posX="20px" posY="20px"/>
                    </div>
                )}
            </>
        )
    }
    return null;
}
export default Modals;