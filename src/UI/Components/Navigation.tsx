import Button from "./Button"

const content = [
    {title:"home", path:"/"},
    {title:"worlds", path:"worlds"},
    {title:"timelines", path:"timeline"},
    {title:"characters", path:"characters"},
    {title:"library", path:"library"},
    {title:"wiki", path:"wiki"},
    {title:"admin notes", path:"notes"},
]

function Navigation() {
    return(
        <div id="nav">
            <h2>THE SINS UNIVERSE</h2>
            <div id="nav-container">
                {content.map((page, index) => (
                    <Button key={index} w="100%" theme="primary" type="link" link={`/${page.path}`}><p>{page.title.toUpperCase()}</p></Button>
                ))}
            </div>
        </div>
    )
}
export default Navigation