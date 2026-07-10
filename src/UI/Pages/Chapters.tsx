import Loading from "../Components/Loading";
import ChapterList from "../Components/ChapterList";
import Button from "../Components/Button";
import Forms from "../Components/Forms";
import Error from "../Components/Error";

import { useFetch } from "../../assets/hooks/useFetch";
import React from "react";

interface ChapterProps {
    name:string;
    status:boolean;
}

interface BooksProps {
    id?: string | number;
    title:string;
    chapters:ChapterProps[];
}

function Chapters() {
    const {data:books, loading, error} = useFetch<BooksProps>("books", true);

    const [showForm, setShowForm] = React.useState<boolean>(false)

    const handleAddChapter = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)
        const target = formData.get("target")?.toString() || ""
        const name = formData.get("name")?.toString() || ""

        const book = books?.find(b => b.title === target)
        if(!book) {
            alert("Target book not found.")
            return
        }

        try {
            const newChapter = { name, status: true }
            const res = await fetch(`http://localhost:5000/api/books/${book.id}/chapters`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newChapter)
            })

            const result = await res.json()
            if(!res.ok) throw Error(result.message || "Failed to add chapter.")
            alert("Create Succes.")
            location.reload()
        } catch (err) {
            const message = err instanceof Error ? err : "Something Went Wrong."
            alert(message)
        }
    }
    
    if(loading) {
        return <Loading message="Loading Books..."/>
    } else if(error) {
        return <Error message={error.message}/>
    } 
    return (
        <div id="chapters" className="full-page pages">
            {books?.map((book)=>(
                <div className="chapter-container" key={book.id}>
                    <h3>{book.title}</h3>
                    <hr style={{border:"1px solid var(--accent)"}}/>
                    <div className="chapter-box">
                        {book?.chapters.map((chap,index)=>(
                            <ChapterList key={index} index={index} name={chap.name} status={chap.status}/>
                        ))}
                    </div>
                </div>
            ))}
            <Button onClick={()=>setShowForm(true)} type="button" w="60px" theme="secondary" style={{
                borderRadius:"50%",
                position:"fixed",
                bottom:"20px",
                right:"20px"
            }}>
                <img style={{width:"70%"}} src="/Images/Icons/plus.svg"/>
            </Button>
            <Forms isOpen={showForm} onClose={()=>setShowForm(false)} id="add-chapter" onSubmit={handleAddChapter}> 
                <Forms.Input type="list" name="target" lists={
                    books.map((book)=>book.title)
                } required/>
                <Forms.Input type="text" name="name" placeholder="Chapter Name:" required/>
            </Forms>
        </div>
    )
}
export default Chapters