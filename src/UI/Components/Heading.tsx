import type { ChangeEvent, FormEvent } from "react";

interface HeadingProps {
    use:string;
    value:string;
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
    onSubmit:(e: FormEvent<HTMLFormElement>)=>void;
}

function Heading(props: HeadingProps) {
    return <header>
        <h2>SINS SAGA {props.use.toUpperCase()} COLLECTION</h2>
        <form onSubmit={props.onSubmit} className="search-bar center">
            <input autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck="false" type="text" placeholder={`Find ${props.use} :`} value={props.value} onChange={props.onChange}/>
        </form>
    </header> 
}
export default Heading;