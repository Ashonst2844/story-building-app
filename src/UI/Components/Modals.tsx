import Button from "./Button";

interface ModalsProps{
    // Main Props
    use: "characters";
    isOpen: boolean;
    onClose: ()=>void;

    // Character Props
    name?:string;
    age?:number;
    gender?:string;
    faction?:string;
    bio?:string;
}

function Modals({ use, isOpen, onClose, name, age, gender, faction, bio }: ModalsProps) {

    if (use === "characters") {
        return(
            <>
                {isOpen && (
                    <div className="modals center float-page">
                        <div className={`${use}-modals center`}>
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
    }
    return null;
}
export default Modals;