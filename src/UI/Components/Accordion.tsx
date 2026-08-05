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

    return <div className="w-full bg-(--primary) p-2">
        <div className="flex items-center justify-between h-16">
            <h3 className="text-base max-w-[70%]">{props.head.toUpperCase()}</h3>
            <Button onClick={()=>open?isOpen(false):isOpen(true)} type="button" theme="primary" w="4rem" h="4rem">
                <Image type="icon" name="caret" className="scale-50" style={{rotate:open?"90deg":"0deg"}}/>
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
}
export default Accordion;