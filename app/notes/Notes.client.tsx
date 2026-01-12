"use client"

import { useState } from 'react'
import css from './Notes.module.css';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from "@lib/api";
import SearchBox from "@components/SearchBox/SearchBox";
import NoteList from "@components/NoteList/NoteList";
import Pagination from "@components/Pagination/Pagination";
import Modal from "@components/Modal/Modal";
import NoteForm from "@components/NoteForm/NoteForm";


function NotesClient() {

    const [currentPage, setCurrentPage] = useState(1)
    const [perPage] = useState(10)
    const [search, setSearch] = useState("")
    const [debouncedSearch] = useDebounce(search, 1000)
    const[isModalOpen, setIsModalOpen] = useState(false)



    const {data, isError, isLoading} = useQuery({
        queryKey: ["notes", currentPage, debouncedSearch],
        queryFn: () => fetchNotes({
            page: currentPage,
            perPage,
            search: debouncedSearch || undefined
        }),
        placeholderData: keepPreviousData,
        retry: false,

    })

    const handleSearchChange = (value: string) => {
        setSearch(value)
        setCurrentPage(1)
    }


    if (isLoading) return <p>Loading, please wait...</p>;
    if (isError || !data) return <p>Something went wrong.</p>;

    return (
    <>
    <div className={css.app}>
        <header className={css.toolbar}>
            {<SearchBox value={search} onChange={handleSearchChange}/>}
            {data && (<Pagination currentPage={currentPage} totalPages={data.totalPages || 0} onPageChange={setCurrentPage} />)}

                    <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
            </button>

            {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
                <NoteForm onClose={()=> setIsModalOpen(false)}/>
            </Modal>
    )}
        </header>
        {data && <NoteList notes={data.notes} />}
        </div>
        </>
)
}

export default NotesClient
