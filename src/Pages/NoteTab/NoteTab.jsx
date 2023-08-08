import React, { useState } from 'react';
import NoteCard from '../NoteCard/NoteCard';


const NoteTab = ({note_category}) => {
    const [searchText,setSearchText]=useState('')


    const handleSearch=()=>{

    }
    return (
        <>
        <div className='text-end'>
            <input onChange={(e)=>setSearchText(e.target.value)} type="search" name="" id="" className='p-1 my-5 rounded-xl pl-2' placeholder='search your note'/>
            <button className='btn bg-lime-700 btn-sm ml-4' onClick={handleSearch}>Search</button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {
                note_category.map(note => <NoteCard
                    key={note._id}
                    note={note}
                ></NoteCard>)
            }
        </div>
        </>
    );
};

export default NoteTab;