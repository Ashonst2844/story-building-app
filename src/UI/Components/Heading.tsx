import type { ChangeEvent, FormEvent } from "react";
import Button from "./Button";

interface HeadingProps {
    use:string;
    value:string;
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
    onSubmit:(e: FormEvent<HTMLFormElement>)=>void;
}

function Heading(props: HeadingProps) {
    return <div className="header">
        <h2>SINS SAGA {props.use.toUpperCase()} COLLECTION</h2>
        <form onSubmit={props.onSubmit} className="search-bar center">
            <input type="text" placeholder={`Find ${props.use} :`} value={props.value} onChange={props.onChange}/>
            <Button w="10%" h="100%" theme="secondary" type="button">
                <img style={{width:"30px"}} src="/Images/Icons/magnifier.svg"/>
            </Button>
        </form>
    </div> 
}
export default Heading;