import { useMutation, useQueryClient} from "@tanstack/react-query"
import { deleteNote } from "lib/api";
import  css  from "../NoteList/NoteList.module.css";
import type { Note } from "../../types/note";
import Link from "next/link";

interface NoteListProps {
    notes: Note[]
}

export default function NoteList({notes}: NoteListProps) {

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
            mutationFn: deleteNote,
            onSuccess: () => queryClient.invalidateQueries({ queryKey : ["notes"]})
        })
        
    if(notes.length === 0){
        return null
    }

return (
    <>
    <ul className={css.list}>
	{notes.map(note => (
        <li className={css.listItem} key={note.id}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <div className={css.footer}>
        <span className={css.tag}>{note.tag}</span>
        <Link href={`/notes/${note.id}`} className={css.link}>
            View details
        </Link>
        <button className={css.button} onClick={() => {deleteMutation.mutate(note.id)}}>Delete</button>
        </div>
    </li>))}
    </ul>

</>
)
}

    