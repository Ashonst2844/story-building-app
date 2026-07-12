import Image from "./Image";

import * as ReactDOM from "react-router-dom"

interface ButtonProps {
    //Global Button Props
    type: "link" | "button" | "submit" | "back-button";
    link?:string;
    theme?: "main" | "primary" | "secondary" | "warning";
    w?:string;
    h?:string;
    children?:React.ReactNode;
    style?:React.CSSProperties;
    className?:string;
    forNav?:boolean;
    
    //Back Button Props
    posX?:string;
    posY?:string;

    //Event Handle
    onClick?:()=>void;

    //URL Props
    url?:string
}

function Button(props: ButtonProps) {
    if (props.type=="link") {
        const to = props.url ?? props.link ?? "/";
        const target = props.url ? "_blank" : "_self";
        return(
            <ReactDOM.Link target={target} to={to}
            style={{width:props.w ,height: props.h ? props.h : "60px", ...props.style}} className={`center button ${
                props.forNav ? "navs-button" : props.theme == "main" ? "main-button" : props.theme == "primary" ? "primary-button" : "secondary-button" 
            } ${props.className}`}>{props.children}</ReactDOM.Link>
        )
    } else if (props.type=="back-button") {
        return(
            <button style={{right: props.posX, top: props.posY, width: props.w, height: props.h ? props.h : "60px"}} className={`center button back-button secondary-button ${props.className}`} onClick={props.onClick}>
                <Image type="icon" name="arrow" style={{
                    rotate:"180deg"
                }}/>
            </button>
        )
    } else {
        return(
            <button type={props.type} style={{width:props.w,height: props.h ? props.h : "60px", ...props.style}} className={`center button ${
                props.theme == "primary" ? "primary-button" : 
                props.theme == "secondary" ? "secondary-button" : "warning-button"
            } ${props.className}`} onClick={props.onClick}>{props.children}</button>
        )
    }
}
export default Button;