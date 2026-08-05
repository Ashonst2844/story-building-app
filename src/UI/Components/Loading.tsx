import {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react"


interface LoadingProps {
    message:string;
}
function Loading(props:LoadingProps) {
    const loadingRef = useRef<HTMLDivElement>(null)

    useGSAP(()=>{
        if (!loadingRef.current) return;
        gsap.fromTo(".load", {height:0}, {height:"100%",duration:0.2,stagger:0.2,repeat:-1})
    })

    return(
        <div className="center flex-col w-screen h-screen absolute top-0 left-0 bg-black/75 z-60">
            <div ref={loadingRef} className="flex w-32 h-16 gap-2">
                {["","","",""].map((item,i)=><div key={i} className="w-[25%] h-full bg-(--accent) rounded-xl load">{item}</div>)}
            </div>
            <p>{props.message}</p>
        </div>
    )
}
export default Loading;