import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';

const img_hosting_token = import.meta.env.VITE_Img_Upload_Token;

const SignUp = () => {
    const { createUser, profileUpdate, logOut } = useContext(AuthContext);
    const navigate=useNavigate();

    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    const inputData=async(data)=>{
        const email=data.email;
        const name=data.name;
        const user={name,email};
        const res = await fetch('http://localhost:5000/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const result = await res.json();
        console.log(result);

    }


    const handleLogOut = () => {
        logOut()
            .then()
            .catch(error => console.log(error))
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
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
                            const { name } = data;
                            profileUpdate(name, imgURL);
                            inputData(data);
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Registration Successful',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            reset();
                            handleLogOut();
                            navigate('/signIn');
                        }
                    })
                    .catch(error => console.log(error));
            })
    }
    return (
        // <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl ">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} placeholder="Your name" name="name" className="input input-bordered" />
                        {errors.name && <span className="text-red-500">name is required</span>}
                    </div>
                    {/* <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" {...register("PhotoURL", { required: true })} placeholder="Your Photo URL" className="input input-bordered" />
                            {errors.photoURL && <span className="text-red-500">Photo URL is required</span>}
                        </div> */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Photo of you</span>
                        </label>
                        <input type='file' {...register("photo", { required: true })} className="file-input file-input-bordered w-full" />
                        {errors.photo && <span>This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: true })} placeholder="Your email" name="email" className="input input-bordered" />
                        {errors.email && <span className="text-red-500">email is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" {...register("password", {
                            required: true, maxLength: 20, minLength: 6,
                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/i
                        })} placeholder="password" className="input input-bordered" />
                        {errors.password?.type === 'required' && <p className="text-red-500">password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-500">password must be 6 characters</p>}
                        {errors.password?.type === 'maxLength' && <p className="text-red-500">password must be less than characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-500">password must have one uppercase, one lowercase, one special character and one digit</p>}

                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn bg-lime-700" type="submit" value="SignUp" />
                    </div>
                </form>
                <p className="text-center"><small>Already have an account? <span className='text-lg font-bold text-red-800'><Link to='/signIn'>SignIn</Link></span></small></p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
        // </div>
    );
};

export default SignUp;