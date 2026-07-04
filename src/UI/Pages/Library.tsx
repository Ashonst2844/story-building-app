import Button from "../Components/Button";
import Cards from "../Components/Cards";
import Loading from "../Components/Loading";
import Forms from "../Components/Forms";

import { useFetch } from "../../assets/hooks/useFetch";
import { useForm } from "../../assets/hooks/useForm";

import React from "react";

interface BooksProps {
    id:number;
    title:string;
    cover:string;
    link:string;
    series:number;
}

function Library() {
    const [image, setImage] = React.useState<File|undefined>(undefined)

    const {data:books, loading, error} = useFetch<BooksProps>("http://localhost:5000/api/books", "sort");
    console.log(loading, error, books)

    const {onSubmit,uploadLoading} = useForm(["title","series","cover"])
    const [showForm,setShowForm] = React.useState(false)

    if(loading || uploadLoading) {
        return <Loading message="Loading Books..."/>
    } else {
        return(
            <div id="library" className="full-page pages">
                <h2 className="page-header">SINS SAGA BOOK COLLECTION</h2>
                <div id="book-container" className="card-container">
                    {books?.map((book)=>(
                        <Cards key={book.id} use="books" title={book.title} cover={book.cover} link={book.link} />
                    ))}
                    <Button onClick={()=>setShowForm(true)} w="100%" h="300px" type="button" theme="secondary">
                        <img src="/src/assets/icons/plus.svg"/>
                    </Button>
                </div>
                <Forms isOpen={showForm} onClose={()=>setShowForm(false)} id="create-book" onSubmit={(e)=>onSubmit(e, "http://localhost:5000/api/books", image)}>
                    <Forms.Input type="text" name="title" placeholder="Title:" required/>
                    <Forms.Input type="number" name="series" placeholder="Series:" required/>
                    <Forms.Input type="text" name="link" placeholder="Link (https://www.wattpad.com/story/) :" required/>
                    <Forms.Input type="file" name="cover" onFileChange={(image)=>setImage(image)} required/>
                </Forms>
            </div>
        )
    }
}
export default Library