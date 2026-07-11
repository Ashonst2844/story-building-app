import { useState } from "react";
import Button from "./Button";

interface ChapterListProps {
    bookId: string | number;
    index: number;
    name: string;
    status: boolean;
}

function ChapterList(props: ChapterListProps) {
    const [state, setState] = useState<boolean>(props.status);

    const handleState = async () => {
        const nextState = !state;

        try {
            const response = await fetch(`http://localhost:5000/api/books/${props.bookId}/chapters/${props.index}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: nextState })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Gagal memperbarui chapter.");
            }

            setState(nextState);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Terjadi kesalahan saat memperbarui chapter.";
            alert(message);
        }
    };

    return (
        <div className="chapter-list" title={props.name}>
            <Button onClick={handleState} style={{ color: "white" }} type="button" w="60px" theme="primary" className={state ? "done" : "undone"}>
                Chp.{props.index}
            </Button>
        </div>
    );
}
export default ChapterList;