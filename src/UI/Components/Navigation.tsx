import Button from "./Button"
import Image from "./Image"

const content = [
    {title:"home", path:"", type:"all"},
    {title:"world", path:"world", type:"all"},
    {title:"timelines", path:"timeline", type:"all"},
    {title:"characters", path:"characters", type:"all"},
    {title:"library", path:"library", type:"all"},
    {title:"wiki", path:"wiki", type:"all"},
    {title:"admin notes", path:"notes", type:"admin"},
]

function Navigation() {
    const isAdmin = import.meta.env.DEV

    return(
        <nav>
            <h2>THE SINS UNIVERSE</h2>
            <div id="nav-container">
                {content.map((page, index) => {
                    if(page.type==="all") {
                        return <Button key={index} theme="primary" type="link" link={`/${page.path}`}>
                            <Image className="phone-mode" style={{width:"25%"}} type="icon" name={page.title.replace(/\s+/g, "")}/>
                            <p style={{color:"var(--primary)"}} className="desktop-mode">{page.title.toUpperCase()}</p>
                        </Button>
                    } else if(isAdmin) { 
                        return <Button key={index} theme="primary" type="link" link={`/${page.path}`}>
                            <Image className="phone-mode" style={{width:"25%"}} type="icon" name={page.title.replace(/\s+/g, "")}/>
                            <p style={{color:"var(--primary)"}} className="desktop-mode">{page.title.toUpperCase()}</p>
                        </Button>
                    } 
                })}
            </div>
        </nav>
    )
}
export default Navigation