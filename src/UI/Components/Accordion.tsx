import Button from "./Button";

import React from "react";

interface AccordionProps {
    //main property
    use:string;
    type:"desc"|"list"
    head:string;
    body?:string;
    //list property
    listBody?:string[];
}

function Accordion({use,type,head,body,listBody}:AccordionProps) {
    const [open, isOpen] = React.useState<boolean>(false)
    
    return (
        <div className={`${use}-accordion accordion`}>
            <div className="accordion-head">
                <p>{head}</p>
                <Button onClick={()=>open?isOpen(false):isOpen(true)} type="button" theme="primary" w="40px" h="40px">
                    <img style={{width:"100%", rotate:open?"90deg":"0deg", transform:"translateX(-25%)"}} src="/src/assets/icons/caret.svg" />
                </Button>
            </div>
            {open &&
                <div style={{display:open?"block":"none"}} className="accordion-body">
                    {type==="desc" ?
                        <p>{body}</p> :
                        <ul style={{listStyle:"number", padding:"calc(var(--spacing)*2)"}}>
                            {
                                listBody.map((list,index)=>(
                                    <li key={index}>{list}</li>
                                ))
                            }
                        </ul>
                    }
                </div>
            }

        </div>
    )
}
export default Accordion;