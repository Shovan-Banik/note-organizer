import React from 'react';
import Swal from 'sweetalert2';
import useAllNotesDB from '../../hooks/useAllNotesDB';
import { useNavigate } from 'react-router-dom';

const NoteCard = ({ note }) => {
    const { _id, photo, date, details, title } = note;
    const[allNotes,refetch]=useAllNotesDB();
    const navigate=useNavigate();


    const handleUpdate = _id => {
        navigate(`/updateNote/${_id}`)
    }


    const handleDelete = _id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/notes/${_id}`,{
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
    return (
        <>
        <div className="card card-compact w-72 bg-base-100 shadow-xl my-12">
            <figure><img className='h-[200px] w-full' src={photo} alt="home" /></figure>
            <div className="card-body">
                <h2 className="card-title">Title: {title}</h2>
                <p>Date: {date}</p>
                <p>Details: {details}</p>
            </div>
            <div className='pb-5'>
                <button onClick={() => handleUpdate(_id)} className='btn btn-sm bg-yellow-500 mx-4'>Update</button>
                <button onClick={() => handleDelete(_id)} className='btn btn-sm bg-red-700'>Delete</button>
            </div>
        </div>
        </>
    );
};

export default NoteCard;