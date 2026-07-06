interface BadgeProps {
    name:string;
}

function Badge(props : BadgeProps) {
    return(
        <div className="badges center">
            <p>{props.name}</p>
        </div>
    )
}
export default Badge;