import Button from "./Button";
import Badge from "./Badge";
import ChapterList from "./ChapterList";

interface ChapterProps {
    name:string;
    status:boolean;
}

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
    BookId?:string;
    title?:string;
    genres?:string[];
    synopsys?:string;
    url?:string;
    chapters?:ChapterProps[];
}

function Modals(props: ModalsProps) {
    const isAdmin = import.meta.env.DEV
    return(
        <>
            {props.isOpen && (
                <div className="modals center float-page">
                    <div className={`modal-box center`}>
                        {props.use==="characters" ? (
                            <>
                                <h2>{props.name}</h2>
                                <div>
                                    <p>Age: {props.age ?? "-"}</p>
                                    <p>Gender: {props.gender ?? "-"}</p>
                                    <p>Faction: {props.faction ?? "-"}</p>
                                    <p>Description: {props.bio ?? "-"}</p>
                                </div>
                            </>
                        ) : props.use==="books" ? (
                            <>
                                <h2>{props.title ?? ""}</h2>
                                <div className="badge-group center">
                                    {(props.genres ?? []).map((genre,index)=>(
                                        <Badge key={index} name={genre}/>
                                    ))}
                                </div>
                                <p style={{textAlign:"justify", margin:"var(--spacing) 0"}}>{`"${props.synopsys ?? ""}"`}</p>
                                <Button type="link" w="100%" theme="primary" url={props.url ?? ""}>Read This Book!</Button>
                            </>
                        ) : ""}
                    </div>
                    {props.use==="books" && (
                        <div className="second-modal-box">
                            {(props.chapters ?? []).map((chap,index)=>{
                                if(chap.status) {
                                    return <ChapterList BookId={props.BookId ?? ""} index={index} name={chap.name} status={chap.status}/>
                                } else if(isAdmin) {
                                    return <ChapterList BookId={props.BookId ?? ""} index={index} name={chap.name} status={chap.status}/>
                                }
                                return null;
                            })}
                        </div>
                    )}
                    <Button onClick={props.onClose} type="back-button" theme="primary" w="60px" posX="20px" posY="20px"/>
                </div>
            )}
        </>
    )   
}
export default Modals;