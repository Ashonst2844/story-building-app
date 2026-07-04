interface ErrorProps {
    message:string;
}
function Error({message}:ErrorProps) {
    return(
        <div className="pages full-page center">
            <img src="" alt="/src/assets/icons/sad.svg"/>
            <h2>{message}</h2>
        </div>
    )
}
export default Error