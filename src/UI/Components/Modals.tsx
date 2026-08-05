import Button from "./Button";

import React from "react";

interface ModalsProps{
    isOpen: boolean;
    onClose: ()=>void;
    children: React.ReactNode;
}

function Modals(props: ModalsProps) {
    const isOpen = props.isOpen
    return <> 
        {isOpen && <div className="center flex-col w-screen h-screen absolute top-0 left-0 bg-black/75 z-30">
            <Button type="back-button" w="64px" h="64px" onClick={props.onClose}></Button>
            {props.children}
        </div>}
    </>
} export default Modals;