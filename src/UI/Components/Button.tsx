import Image from "./Image";

import * as ReactDOM from "react-router-dom"

interface ButtonProps {
    //Global Button Props
    type: "link" | "button" | "submit" | "back-button";
    link?:string;
    theme?: "primary" | "secondary" | "warning";
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
    const primaryButton = "text-(--primary) bg-(--accent) font-bold"
    const secondaryButton = "bg-(--primary) border border-(--accent) font-bold"

    if (props.type=="link") {
        const to = props.url ?? props.link ?? "/";
        const target = props.url ? "_blank" : "_self";
        return(
            <ReactDOM.Link target={target} to={to}
            style={{...(props.w && {width: props.w}), ...(props.h && {height: props.h}), ...props.style}} className={`center ${
                props.theme == "primary" ? primaryButton : secondaryButton
            } ${props.className}`}>{props.children}</ReactDOM.Link>
        )
    } else if (props.type=="back-button") {
        return(
            <button style={{...(props.w && {width: props.w}), ...(props.h && {height: props.h})}} className={`center w-auto absolute z-50 top-0 right-0 m-4 rounded-full p-2 ${secondaryButton} ${props.className}`} onClick={props.onClick}>
                <Image type="icon" name="arrow" className="rotate-180"/>
            </button>
        )
    } else {
        return(
            <button type={props.type} style={{...(props.w && {width: props.w}), ...(props.h && {height: props.h}), ...props.style}} className={`center w-auto ${
                props.theme == "primary" ? primaryButton : 
                props.theme == "secondary" ? secondaryButton : 'bg-(--warning)'
            } ${props.className}`} onClick={props.onClick}>{props.children}</button>
        )
    }
}

export default Button;