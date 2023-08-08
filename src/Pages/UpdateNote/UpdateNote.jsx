import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAllNotesDB from '../../hooks/useAllNotesDB';
import { AuthContext } from '../../Provider/AuthProvider';

const UpdateNote = () => {
    const { _id, title, category, date, details, photo } = useLoaderData();
    const [allNotes, refetch] = useAllNotesDB();
    const { user } = useContext(AuthContext);

    const updatedNote = (updateNote) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://note-organizer-server.vercel.app/notes/${_id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updateNote)
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.modifiedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Updated!',
                                'Your file has been updated.',
                                'success'
                            );
                        }
                    })
                    .catch((error) => {
                        console.error('Error updating note:', error);
                        Swal.fire(
                            'Error',
                            'An error occurred while updating the note.',
                            'error'
                        );
                    });
            }
        });
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: title,
            category: category,
            date: date,
            details: details,
            photo: photo,
        },
    });

    const onSubmit = (data) => {
        const { title, date, category, details, photo } = data;
        const updateNote = {
            title,
            date,
            category,
            details,
            photo,
            email: user?.email,
        };
        reset();
        updatedNote(updateNote);
    };


    return (
        <div className="card flex-shrink-0 w-full md:w-1/2 mx-auto shadow-2xl bg-base-100 my-12">
            <div>
                <h1 className="text-3xl text-center pt-2 font-bold">Update Your Note</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card-body">
                        <div className='md:flex gap-4'>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type='text' {...register("title", { required: true })} className="input input-bordered" />
                                {errors.title && <span>This field is required</span>}
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Photo of property</span>
                                </label>
                                <input type='url' {...register("photo", { required: true })} className="input input-bordered w-full" readOnly />
                                {errors.photo && <span>This field is required</span>}
                            </div>
                        </div>
                        <div className='md:flex gap-4'>
                            <div className="form-control  w-full">
                                <label className="label">
                                    <span className="label-text">Date</span>
                                </label>
                                <input type='date' {...register("date", { required: true })} className="input input-bordered" />
                                {errors.date && <span>This field is required</span>}
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select {...register("category", { required: true })} className="input input-bordered">
                                    <option value="important">Important Note</option>
                                    <option value="daily">Daily Note</option>
                                    <option value="job">Job Task Note</option>
                                    <option value="meeting">Meeting Note</option>
                                </select>
                                {errors.role && <span>This field is required</span>}
                            </div>
                        </div>
                        <div className="form-control  w-full">
                            <label className="label">
                                <span className="label-text">Details</span>
                            </label>
                            <textarea type='text' {...register("details", { required: true })} className="textarea textarea-bordered h-24" />
                            {errors.details && <span>This field is required</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-lime-700">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateNote;