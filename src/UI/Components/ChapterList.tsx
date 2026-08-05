import { useState } from "react";
import Button from "./Button";

interface ChapterListProps {
    BookId: number;
    index: number;
    name: string;
    status: boolean;
}

function ChapterList(props: ChapterListProps) {
    const primaryButton = "text-(--primary) bg-(--accent) font-bold"
    const secondaryButton = "text-(--text) bg-(--primary) border border-(--accent) font-bold"
    const isAdmin = import.meta.env.DEV
    const [state, setState] = useState<boolean>(props.status);

    const handleState = async () => {
        const nextState = !state;

        try {
            const response = await fetch(`http://localhost:5000/api/books/${props.BookId.toString()}/chapters/${props.index}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: nextState })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Gagal memperbarui chapter.");
            }

            setState(nextState);
            location.reload()
        } catch (error) {
            const message = error instanceof Error ? error.message : "Terjadi kesalahan saat memperbarui chapter.";
            alert(message);
        }
    };

    return (
        <div title={props.name}>
            <Button onClick={isAdmin ? () => { void handleState(); } : undefined}  w="100%" h="64px" type="button" theme="primary" className={`${state ? primaryButton : secondaryButton}, text-xs`}>
                BAB-{props.index} <br />
                {props.name}
            </Button>
        </div>
    );
}
export default ChapterList;