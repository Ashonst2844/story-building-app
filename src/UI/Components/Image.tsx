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
        <div className="overflow-auto relative" style={{width:props.w, height:props.h}}>
            <img style={{width:`calc(100% * ${scale})`}} className="transition-all transition-300 inline-block vertical-align-center max-w-none absolute" src={props.src} alt={props.name} loading="lazy"/>
            {props.zoom && <div className="fixed right-0 bottom-16 flex m-4 gap-2 lg:bottom-0 z-30">
                <Button onClick={zoomIn} w="32px" h="32px" type="button" theme="primary">+</Button>
                <Button onClick={reset} w="32px" h="32px" type="button" theme="primary">R</Button>
                <Button onClick={zoomOut} w="32px" h="32px" type="button" theme="primary">-</Button>
            </div>}
        </div>
    ) : props.type === "icon" ? (
        <img loading="eager" src={`/Images/Icons/${props.name}.svg`} alt={props.name} className={props.className} style={props.style}/>
    ) : (
        <img loading="lazy" src={props.src} alt={props.name} style={props.style} onClick={props.onClick} className={props.className}/>
    )
}
export default Image;