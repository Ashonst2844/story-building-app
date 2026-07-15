import Button from "./Button";

import React from "react";

interface ImageProps {
    type:"normal"|"icon"|"map";
    w?:string;
    h?:string;
    zoom?:boolean;
    name:string;
    src?:string;
    style?:React.CSSProperties;
    className?:string;

    onClick?:()=>void;
}

function Image(props: ImageProps) {
    const [scale, setScale] = React.useState<number>(1)

    const zoomIn = ()=>{
        setScale((prev) => Math.min(prev + 0.25, 3));
    }
    const zoomOut = ()=>{
        setScale((prev) => Math.max(prev - 0.25, 1));
    }
    const reset = ()=>{
        setScale(1)
    }

    return props.type === "map" ? (
        <div className="images" style={{width:props.w, height:props.h}}>
            <img style={{width:`calc(100% * ${scale})`}} className="maps" src={props.src} alt={props.name} loading="lazy"/>
            
            {props.zoom && (
                <div className="button-group">
                    <Button onClick={zoomIn} w="50px" h="50px" type="button" theme="primary">+</Button>
                    <Button onClick={reset} w="50px" h="50px" type="button" theme="primary">R</Button>
                    <Button onClick={zoomOut} w="50px" h="50px" type="button" theme="primary">-</Button>
                </div>
            )}
        </div>
    ) : props.type === "icon" ? (
        <img loading="lazy" src={`/Images/Icons/${props.name}.svg`} style={{width:"100%", ...props.style}} alt={props.name} className={props.className}/>
    ) : (
        <img loading="lazy" src={props.src} alt={props.name} style={props.style} onClick={props.onClick}/>
    )
}
export default Image;