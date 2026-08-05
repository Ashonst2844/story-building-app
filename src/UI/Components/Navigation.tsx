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

    return <nav className="w-full h-16 bg-(--primary) overflow-x-scroll flex flex-col gap-1 z-20 bottom-0 fixed lg:p-2 lg:relative lg:w-[30%] lg:h-screen lg:overflow-y-scroll">
        <h2 className="desktop-mode text-2xl">THE SINS UNIVERSE</h2>
        <div className="flex lg:flex-col gap-2 h-full">
            {content.map((page, index) => {
                if(page.type==="all") {
                    return <Button key={index} theme="primary" type="link" link={`/${page.path}`} className="h-full min-w-[20%] lg:w-full lg:h-16">
                        <Image className="phone-mode scale-25" type="icon" name={page.title.replace(/\s+/g, "")}/>
                        <p className="desktop-mode">{page.title.toUpperCase()}</p>
                    </Button>
                } else if(isAdmin) { 
                    return <Button key={index} theme="primary" type="link" link={`/${page.path}`} className="h-full min-w-[20%] lg:w-full lg:h-16">
                        <Image className="phone-mode scale-25" type="icon" name={page.title.replace(/\s+/g, "")}/>
                        <p className="desktop-mode">{page.title.toUpperCase()}</p>
                    </Button>
                } 
            })}
        </div>
    </nav>
}
export default Navigation