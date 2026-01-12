import Link from 'next/link';
import type { Note } from '@/types/note';
import css from './NoteItem.module.css';

interface NoteItemProps {
    note: Note;
    onDelete: (id: string) => void;
}

export default function NoteItem({ note, onDelete }: NoteItemProps) {
    return (
        <li className={css.item}>
            <h3>{note.title}</h3>
            <p className={css.content}>
                {note.content.length > 100 
                    ? `${note.content.substring(0, 100)}...` 
                    : note.content}
            </p>
            <p className={css.date}>
                {new Date(note.createdAt).toLocaleDateString()}
            </p>
            <div className={css.actions}>
                <Link href={`/notes/${note.id}`} className={css.link}>
                    View details
                </Link>
                <button onClick={() => onDelete(note.id)} className={css.button}>
                    Delete
                </button>
            </div>
        </li>
    );
}