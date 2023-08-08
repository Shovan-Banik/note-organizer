import Lottie from "lottie-react";
import animation from '../../assets/animations/animation_ll13br0w.json'
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const img_hosting_token = import.meta.env.VITE_Img_Upload_Token;
const AddNote = () => {
    const{user}=useContext(AuthContext);
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;


    const inputNote=async(newNote)=>{
        const res=await fetch('http://localhost:5000/notes',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote)
        })
        const result=await res.json();
        console.log(result);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your property added Successfully',
            showConfirmButton: false,
            timer: 1500
        })
    }


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('image', data.photo[0]);

        fetch(image_hosting_url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const {title,date,category,details} = data;
                    const newNote = { title,date,category,details, photo: imgURL,email: user?.email };
                    inputNote(newNote);
                    reset();
                }
            })
    }
    return (
        <div className="hero min-h-screen pt-24">
            <div className="hero-content flex-col lg:flex-row">
                <div className="card flex-shrink-0 w-full md:w-1/2 shadow-2xl bg-base-100">
                    <div>
                        <h1 className="text-3xl text-center pt-2 font-bold">Add Your Note</h1>
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
                                        <input type='file' {...register("photo", { required: true })} className="file-input file-input-bordered w-full" />
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
                                    <button type="submit" className="btn bg-lime-700">Add Your Note</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
                <div className="text-center lg:text-left w-full md:w-1/2">
                    <Lottie animationData={animation} loop={true} />
                </div>
            </div >
        </div>
    );
};

export default AddNote;