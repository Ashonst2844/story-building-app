import * as ReactDOM from "react-router-dom"
import React from "react";

interface ButtonProps {
    //Global Button Props
    type: "link" | "button" | "submit" | "back-button";
    link?:string;
    theme: "primary" | "secondary" | "warning";
    w:string;
    h?:string;
    children?:React.ReactNode;
    style?:React.CSSProperties
    
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
        return(
            <ReactDOM.Link target={props.url?"_blank":"_self"} to={props.url?props.url:props.link}
            style={{width:props.w,height: props.h ? props.h : "60px", ...props.style}} className={`center button ${
                props.theme == "primary" ? "primary-button" : "secondary-button" 
            }`}>{props.children}</ReactDOM.Link>
        )
    } else if (props.type=="back-button") {
        return(
            <button style={{right: props.posX, top: props.posY, width: props.w, height: props.h ? props.h : "60px"}} className={`center button back-button ${
                props.theme == "primary" ? "primary-button" : "secondary-button"
            }`} onClick={props.onClick}>
                <img style={{rotate:"180deg"}} className="full-page" src="/src/assets/icons/arrow.svg" alt="Back" />
            </button>
        )
    } else {
        return(
            <button type={props.type} style={{width:props.w,height: props.h ? props.h : "60px", ...props.style}} className={`center button ${
                props.theme == "primary" ? "primary-button" : 
                props.theme == "secondary" ? "secondary-button" : "warning-button"
            }`} onClick={props.onClick}>{props.children}</button>
        )
    }
}
export default Button;