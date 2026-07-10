import Button from "./Button"

const content = [
    {title:"home", path:"", type:"all"},
    {title:"world", path:"world", type:"all"},
    {title:"timelines", path:"timeline", type:"all"},
    {title:"characters", path:"characters", type:"all"},
    {title:"library", path:"library", type:"all"},
    {title:"wiki", path:"wiki", type:"all"},
    {title:"admin notes", path:"notes", type:"admin"},
    {title:"book chapters", path:"chapters", type:"admin"},
]

function Navigation() {
    const isAdmin = import.meta.env.DEV

    return(
        <div id="nav">
            <h2>THE SINS UNIVERSE</h2>
            <div id="nav-container">
                {content.map((page, index) => {
                    if(page.type==="all") {
                        return <Button key={index} w="100%" theme="primary" type="link" link={`/${page.path}`}><p>{page.title.toUpperCase()}</p></Button>
                    } else if(isAdmin) { 
                        return <Button key={index} w="100%" theme="primary" type="link" link={`/${page.path}`}><p>{page.title.toUpperCase()}</p></Button>
                    } 
                })}
            </div>
        </div>
    )
}
export default Navigation