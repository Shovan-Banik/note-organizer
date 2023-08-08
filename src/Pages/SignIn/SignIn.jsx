import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const SignIn = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true });
            })
            .catch(error => console.log(error))
    }
    return (
        <div>
            <h2 className="text-3xl font-bold text-center pt-24 pb-5 text-white">SignIn Please</h2>
            <div className="md:w-1/3 mx-auto shadow-2xl mb-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input type='text' {...register("email", { required: true })} className="input input-bordered" />
                            {errors.email && <span>This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Password</span>
                            </label>
                            <input type='password' {...register("password", { required: true })} className="input input-bordered" />
                            {errors.password && <span>This field is required</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-lime-700">SignIn</button>
                        </div>
                    </div>
                </form>
                <p className="text-white text-center">New to here? <span className="text-red-700 font-bold"><Link to='/signUp'> SingUP</Link></span></p>
                <SocialLogin></SocialLogin>
            </div >
        </div >
    );
};

export default SignIn;