'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from "./NoteDetails.module.css"


export default function NoteDetailsClient() {
    
    const params = useParams();
    const id = params.id as string;
    
    const { data: note,  error } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });
    
    
    if (error || !note) return <p className={css.status}>Something went wrong.</p>;
    
    return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{note.title}</h2>
                </div>
                <p className={css.content}>{note.content}</p>
                <p className={css.date}>
                    {new Date(note.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}