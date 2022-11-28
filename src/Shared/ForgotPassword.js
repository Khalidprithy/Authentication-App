import React from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import auth from '../firebase.init';


const ForgotPassword = () => {
    const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(auth);
    const { register, formState: { errors }, handleSubmit, reset } = useForm({
        mode: 'onTouched'
    });

    const onSubmit = async (data) => {
        const email = data.email;
        if (email) {
            await sendPasswordResetEmail(email);
            toast.success('Reset mail sent, Please check you email');
            reset();
        }
        else {
            toast.error('Please enter your email address');
        }
    }

    return (
        <div className='min-h-screen'>
            <div className="card flex justify-center">
                <div className="card-body w-11/12 md:w-4/12 mx-auto bg-gray-500 text-gray-50 rounded-lg m-4 mt-10">
                    <h4 className='text-xl font-bold text-center'>Reset Password</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full">
                            <label className='ml-2 font-semibold mt-2' htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className={`input input-bordered w-full text-black ${errors.email && 'focus:border-red-600 focus:ring-red-600 border-2 border-red-600'}`}
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Please Enter Your Email'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Enter a valid Email'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text text-base font-semibold text-red-700">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text text-base font-semibold text-red-700">{errors.email.message}</span>}
                            </label>
                        </div>


                        <input
                            className='btn btn-success w-full text-white mt-1 mx-auto transition ease-out duration-300' type="submit" value='Reset' />
                        <p className='text-center mt-4'>Go back to <Link className='text-center text-success mb-2' to='/login'>Login</Link></p>
                        <p className='text-center mt-4'>Does not have an account? <Link className='text-success' to='/signup'>Sign Up</Link> </p>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;