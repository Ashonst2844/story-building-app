interface TimesProps {
    title:string;
    description:string;
    time_range:string;
    related_novel:string[]
}

function Times(props: TimesProps) {
    return(
        <h1>{props.title}</h1>
    )
}
export default Times