import Button from "./Button";

import React from "react";

interface InputProps {
    //MainProperty
    type:"text"|"number"|"list"|"textarea"|"file";
    required:boolean;
    placeholder?:string;
    name:string
    //ListProperty
    lists?:string[];
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    //FileProperty
    onFileChange?: (file:File|undefined)=>void
}

interface FormProps {
    id:string;
    onSubmit:(e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
    onClose: ()=>void;
    isOpen: boolean;
    children:React.ReactNode;
}

function Input({type,required,placeholder,name,lists,onChange,onFileChange}:InputProps) {      
    if(type==="list") {
        return(
            <select name={name} required={required}>
                {(lists ?? []).map((list, index)=> (
                    <option key={index} value={list}>{list.toUpperCase()}</option>
                ))}
            </select>
        )
    } else if(type==="textarea"){
        return(
            <textarea name={name} placeholder={placeholder} required={required}/>
        )
    }
    return(
        <input min={0} type={type} name={name} placeholder={placeholder} accept="image/*" required={required} onChange={
            (e)=>{
                if(onChange) onChange(e);
                if(type==="file" && onFileChange){
                    onFileChange(e.target.files?.[0])
                }
            }
        }/>
    )
}

function Forms({id,onSubmit,onClose,isOpen,children}:FormProps) {

    return (
        <>
            {isOpen &&
                <div id={`${id}-form`} className="float-page center" style={{flexDirection:"column"}}>
                    <h2>{id.toUpperCase()}</h2>
                    <form onSubmit={onSubmit} method="post" className="center form-container">
                        {children}
                        <Button type="submit" w="100%" theme="primary"><p>Create</p></Button>
                    </form>
                    <Button onClick={onClose} type="back-button" theme="primary" w="60px" posX="20px" posY="20px"/>
                </div>
            }
        </>
    )
}

Forms.Input = Input;
export default Forms;