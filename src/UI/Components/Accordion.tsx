import Button from "./Button";
import Image from "./Image";

import React from "react";

interface AccordionProps {
    //main property
    use:string;
    type:"desc"|"list"
    head:string;
    body?:string;
}

function Accordion({use,type,head,body}:AccordionProps) {
    const [open, isOpen] = React.useState<boolean>(false)
    
    return (
        <div className={`${use}-accordion accordion`}>
            <div className="accordion-head">
                <p>{head.toUpperCase()}</p>
                <Button onClick={()=>open?isOpen(false):isOpen(true)} type="button" theme="secondary" w="40px" h="40px">
                    <Image type="icon" name="caret" style={{
                        rotate:open?"90deg":"0deg",
                    }}/>
                </Button>
            </div>
            {open &&
                <div style={{display:open?"block":"none"}} className="accordion-body">
                    <ul style={{listStyle:type==="list"?"number":"none", padding:"calc(var(--spacing)*2)"}}>
                        {
                            (body ?? '').split('\n').map((list,index)=>{
                                const clean = list.trim()
                                if (clean.startsWith("#")) {
                                    const content  = clean.replace(/^#\s*/, '');
                                    return(<h3 key={index}>{content}</h3>)
                                }
                                return (
                                    <li key={index}>{clean}</li>
                                );
                            })
                        }
                    </ul>
                </div>
            }

        </div>
    )
}
export default Accordion;