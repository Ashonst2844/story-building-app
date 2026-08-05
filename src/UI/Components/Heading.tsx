import type { ChangeEvent, FormEvent } from "react";

interface HeadingProps {
    use:string;
    value:string;
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
    onSubmit:(e: FormEvent<HTMLFormElement>)=>void;
}

function Heading(props: HeadingProps) {
    return <header className="flex flex-col justify-around h-[20%]">
        <h2 className="text-2xl">SINS SAGA {props.use.toUpperCase()} COLLECTION</h2>
        <form onSubmit={props.onSubmit} className="center w-full h-12 p-2">
            <input autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck="false" type="text" placeholder={`Find ${props.use} :`} value={props.value} onChange={props.onChange} className="bg-(--primary) p-4"/>
        </form>
    </header> 
}
export default Heading;