interface LoadingProps {
    message:string;
}
function Loading(props:LoadingProps) {
    return(
        <div id="loading-page" className="center float-page">
            <div id="loading-container" className="center">
                <div className="load load-bar1"></div>
                <div className="load load-bar2"></div>
                <div className="load load-bar3"></div>
            </div>
            <p>{props.message}</p>
        </div>
    )
}
export default Loading;