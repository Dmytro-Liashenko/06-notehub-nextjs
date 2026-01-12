import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

export default async function NotePage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const queryClient = new QueryClient();
    
    await queryClient.prefetchQuery({
        queryKey: ['note', params.id],
        queryFn: () => fetchNoteById(params.id),
    });
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    );
}