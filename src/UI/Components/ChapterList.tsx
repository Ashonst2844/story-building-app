import Button from "./Button";

interface ChapterListProps {
    index:number
    name:string;
    status:boolean
}

function ChapterList(props: ChapterListProps) {

    return (
        <div className="chapter-list" title={props.name}>
            <Button style={{color:"white"}} type="button" w="60px" theme="primary" className={props.status ? "done":"undone"}>Chp.{props.index}</Button>
        </div>
    )
}
export default ChapterList;