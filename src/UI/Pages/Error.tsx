interface ErrorProps {
    message:string;
}
function Error({message}:ErrorProps) {
    return(
        <div className="pages full-page center" style={{flexDirection:"column"}}>
            <img style={{width:"200px"}} src="/src/assets/icons/sad.svg"/>
            <p style={{letterSpacing:"10px", fontSize:"3rem", fontWeight:"700", color:"var(--accent)"}}>{message}</p>
        </div>
    )
}
export default Error