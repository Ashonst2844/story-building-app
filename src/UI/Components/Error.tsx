import Image from "./Image";

interface ErrorProps {
    message:string;
}
function Error({message}:ErrorProps) {
    return(
        <div className="pages full-page center" style={{flexDirection:"column"}}>
            <Image type="icon" name="sad" style={{
                width:"200px"
            }}/>
            <p style={{letterSpacing:"10px", fontSize:"3rem", fontWeight:"700", color:"var(--accent)"}}>{message}</p>
        </div>
    )
}
export default Error