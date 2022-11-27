import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';

const SignUp = () => {
    const [passwordShow, setPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const { register, watch, formState: { errors }, handleSubmit } = useForm({
        mode: 'onTouched'
    });
    const [agree, setAgree] = useState(false);
    let errorMessage;

    const password = watch("password");

    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name })
        toast.success(`Welcome to Auth App`)
    }


    return (
        <div className='min-h-screen'>
            <div className="card flex justify-center">
                <div className="card-body w-11/12 md:w-4/12 mx-auto bg-gray-500 text-gray-50 rounded-lg m-4">
                    <h2 className='text-3xl text-center font-semibold'>Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full">
                            <label className='ml-2 font-semibold' htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="input input-bordered w-full"
                                {...register("firstName", {
                                    required: {
                                        value: true,
                                        message: 'Please Enter Your First Name'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.firstName && <span className="label-text text-base font-semibold text-red-700">{errors.firstName.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className='ml-2 font-semibold' htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="input input-bordered w-full"
                                {...register("lastName", {
                                    required: {
                                        value: true,
                                        message: 'Please Enter Your Last Name'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.lastName && <span className="label-text text-base font-semibold text-red-700">{errors.lastName.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className='ml-2 font-semibold' htmlFor="phone">Phone Number</label>
                            <input
                                type="number"
                                placeholder="Phone Number"
                                className="input input-bordered w-full"
                                {...register("phone", {
                                    required: {
                                        value: true,
                                        message: 'Please Enter Your Phone Number'
                                    },
                                    minLength: {
                                        value: 10,
                                        message: 'Must be 10 digits'
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: 'Must be 10 digits'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.phone && <span className="label-text text-base font-semibold text-red-700">{errors.phone.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className='ml-2 font-semibold' htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className={`input input-bordered w-full ${errors.email && 'focus:border-red-600 focus:ring-red-600 border-2 border-red-600'}`}
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
                        <div className="form-control w-full relative">
                            <label className='ml-2 font-semibold' htmlFor="password">Password</label>
                            <input
                                type={passwordShow ? 'text' : 'password'}
                                placeholder="Your Password"
                                className={`input input-bordered w-full text-black ${errors.password && 'focus:border-red-600 focus:ring-red-600 border-2 border-red-600'}`}
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Please Enter You Password'
                                    },
                                    pattern: {
                                        value: /^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/,
                                        message: 'Password must contain minimum eight characters, at least one uppercase letter and one number'
                                    }
                                })}
                            />
                            <div className='text-2xl absolute top-9 right-2'>
                                {
                                    (passwordShow === false) ? <AiFillEyeInvisible className='text-gray-700' onClick={() => setPasswordShow(!passwordShow)}></AiFillEyeInvisible> : <AiFillEye className='text-gray-700' onClick={() => setPasswordShow(!passwordShow)}></AiFillEye>
                                }
                            </div>
                            <label className="label">
                                {errors.password && <span className="label-text text-base font-sem text-red-700">{errors.password.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full relative">
                            <label className='ml-2 font-semibold' htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                onPaste={(e) => {
                                    e.preventDefault()
                                    return false
                                }}
                                type={confirmPasswordShow ? 'text' : 'password'}
                                className={`input input-bordered w-full text-black ${errors.confirmPassword && 'focus:border-red-600 focus:ring-red-600 border-2 border-red-600'}`}
                                {...register("confirmPassword", {
                                    required: 'Confirm your Password',
                                    validate: (value) =>
                                        value === password || "The passwords do not match"
                                })}
                            />
                            <div className='text-2xl absolute top-9 right-2'>
                                {
                                    (confirmPasswordShow === false) ? <AiFillEyeInvisible className='text-gray-700' onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}></AiFillEyeInvisible> : <AiFillEye className='text-gray-700' onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}></AiFillEye>
                                }
                            </div>
                            <label className="label">
                                {errors.confirmPassword && <span className="label-text text-base font-semibold text-red-700">{errors.confirmPassword.message}</span>}
                            </label>
                        </div>
                        {errorMessage}
                        <div className='flex item-center gap-1'>
                            <input
                                onClick={() => setAgree(!agree)}
                                className='w-5 h-5 '
                                type="checkbox" name="terms" id="" />
                            <label className='ml-1 pb-2 text-gray-50' htmlFor="terms">I agree with the <span className='font-semibold text-gray-50 cursor-pointer'>terms and conditions</span></label>
                        </div>
                        <p>Already have an account? <Link className='text-green-400 hover:text-success' to='/login'>Login</Link> </p>
                        <input
                            disabled={!agree}
                            className={agree ? 'btn btn-success w-full text-white mt-2 mx-auto transition ease-out duration-300' : 'btn btn-error mt-2 outline outline-1 outline-red-400 w-full'} type="submit" value='Create Account' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;