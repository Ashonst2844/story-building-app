import Image from "./Image";

interface ErrorProps {
    message:string;
}
function Error({message}:ErrorProps) {
    return(
        <section className="center flex-col">
            <Image type="icon" name="sad" className="w-50"/>
            <p className="text-5xl font-black text-(--accent) tracking-wider">{message}</p>
        </section>
    )
}
export default Error