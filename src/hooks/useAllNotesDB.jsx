import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider';

const useAllNotesDB = () => {
    const{user,loading}=useContext(AuthContext);
    const token = localStorage.getItem('access-token');

    const {refetch, data: allNotes=[]} = useQuery({
        queryKey: ['notes', user?.email],
        enabled: !loading,
        queryFn: async()=>{
            const res = await fetch(`https://note-organizer-server.vercel.app/notes?email=${user?.email}`,{
                headers: {
                    authorization: `bearer ${token}`
                }
            })
            return res.json();
        },
      })
    return [allNotes,refetch];
};

export default useAllNotesDB;