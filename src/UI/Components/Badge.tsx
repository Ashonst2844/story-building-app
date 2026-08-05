interface BadgeProps {
    name:string;
}

function Badge(props : BadgeProps) {
    return(
        <div className="center w-auto h-12 text-xs text-center p-4 rounded-4xl bg-(--accent) text-(--primary)">
            <p>{props.name}</p>
        </div>
    )
}
export default Badge;