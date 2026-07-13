import type { ChangeEvent, FormEvent } from "react";

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
            <input autoComplete="none" autoCorrect="none" type="text" placeholder={`Find ${props.use} :`} value={props.value} onChange={props.onChange}/>
        </form>
    </div> 
}
export default Heading;