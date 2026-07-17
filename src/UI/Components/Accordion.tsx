import Button from "./Button";
import Image from "./Image";

import React from "react";

interface AccordionProps {
    //main property
    head:string;
    body:string;
}

function Accordion(props:AccordionProps) {
    const [open, isOpen] = React.useState<boolean>(false)
    
    return (
        <div className={`accordions`}>
            <div className="accordion-head">
                <h3>{props.head.toUpperCase()}</h3>
                <Button onClick={()=>open?isOpen(false):isOpen(true)} type="button" theme="primary" w="40px" h="40px">
                    <Image type="icon" name="caret" style={{
                        rotate:open?"90deg":"0deg",
                    }}/>
                </Button>
            </div>
            {open &&
                <div style={{display:open?"block":"none"}} className="accordion-body">
                        {(props.body ?? '').split('\n').map((list,index)=>{
                            const clean = list.trim()

                            if(clean.startsWith("#")) {
                                const content  = clean.replace(/^#\s*/, '');
                                return(<h3 key={index}>{content}</h3>)
                            } return (<p>{clean}</p>);
                        })}
                </div>
            }

        </div>
    )
}
export default Accordion;