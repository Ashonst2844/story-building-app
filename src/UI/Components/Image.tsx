import Button from "./Button";

import React from "react";

interface ImageProps {
    w:string;
    h:string;
    zoom?:boolean;
    src:string
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

    return <div className="images" style={{width:props.w, height:props.h}}>
        <img style={{width:`calc(100% * ${scale})`, transition:"var(--transition)", display:"inline-block", verticalAlign:"center", maxWidth:"none"}} src={props.src}/>
        {props.zoom && (
            <div className="zoom-group">
                <Button onClick={zoomIn} w="50px" h="50px" type="button" theme="primary">+</Button>
                <Button onClick={reset} w="50px" h="50px" type="button" theme="primary">R</Button>
                <Button onClick={zoomOut} w="50px" h="50px" type="button" theme="primary">-</Button>
            </div>
        )}
    </div>
}
export default Image;