import Button from "../Components/Button";
import Cards from "../Components/Cards";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import Forms from "../Components/Forms";
import Heading from "../Components/Heading";
import Image from "../Components/Image";

import { useFetch } from "../../assets/hooks/useFetch";
import { useForm } from "../../assets/hooks/useForm";

import React from "react";

interface ChapterProps {
    name:string;
    status:boolean;
}

interface BooksProps {
    BookId:string;
    title:string;
    cover:string;
    link:string;
    series:number;
    genres:string[];
    synopsys:string;
    chapters:ChapterProps[];
}

function Library() {
    const isAdmin = import.meta.env.DEV
    const [image, setImage] = React.useState<File|undefined>(undefined)

    const {data:books, loading, error} = useFetch<BooksProps>("books", true);

    const {onSubmit,uploadLoading} = useForm(["title","series","cover"], {
        chapters:[]
    })
    const [showForm,setShowForm] = React.useState(false)
    const [searchQ, setSearchQ] = React.useState("")

    if(loading || uploadLoading) {
        return <Loading message="Loading Books..."/>
    } else if(error) {
        return <Error message={error.message}/>
    }
    return(
        <div id="library" className="full-page pages">
            <Heading use="books" value={searchQ} 
            onChange={(e)=>setSearchQ(e.target.value)} 
            onSubmit={(e)=>{
                e.preventDefault() 
                setSearchQ(searchQ)
            }} />
            <div id="book-container" className="card-container">
                {books?.map(book=>book.title.toLowerCase().startsWith(searchQ) && (
                    <Cards key={book.BookId} use="books" 
                    BookId={book.BookId}
                    title={book.title} 
                    cover={book.cover} 
                    link={book.link} 
                    genres={book.genres}
                    synopsys={book.synopsys}
                    chapters={book.chapters}/>
                ))}
                {isAdmin && (
                    <div className="button-group">
                        <Button onClick={()=>setShowForm(true)} type="button" theme="secondary">
                            <Image type="icon" name="plus" style={{
                                width:"50%"
                            }}/>
                        </Button>
                    </div>
                )}
            </div>
            <Forms isOpen={showForm} onClose={()=>setShowForm(false)} id="create-book" onSubmit={(e)=>onSubmit(e, "http://localhost:5000/api/books", image)}>
                <Forms.Input type="text" name="title" placeholder="Title:" required/>
                <Forms.Input type="number" name="series" placeholder="Series:" required/>
                <Forms.Input type="text" name="link" placeholder="Link (https://www.wattpad.com/story/) :" required/>
                <Forms.Input type="text" name="genres" placeholder="Genres (Separate With Commas (,)) :" required/>
                <Forms.Input type="textarea" name="synopsys" placeholder="Synopsys :" required/>
                <Forms.Input type="file" name="cover" onFileChange={(image)=>setImage(image)} required/>
            </Forms>
        </div>
    )
}
export default Library;