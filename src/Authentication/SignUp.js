import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';
import Loading from '../Shared/Loading';
import useToken from '../Shared/useToken';

const SignUp = () => {

    const [passwordShow, setPasswordShow] = useState(false);

    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    console.log("Sign Up", user)

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    const [token] = useToken(user || googleUser);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const { register, watch, formState: { errors }, handleSubmit } = useForm({
        mode: 'onTouched'
    });
    const [agree, setAgree] = useState(false);
    let errorMessage;

    if (error || googleError) {
        errorMessage = <p className='text-error'>{error?.message || googleError?.message}</p>
    }

    const password = watch("password");

    const onSubmit = async data => {
        const currentUser = {
            name: data.name,
            place: data.place,
            phone: data.phone,
            email: data.email,
        }
        await fetch(`http://localhost:5000/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(currentUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success(`User added`)
            })
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name })
        navigate('/profile')
        toast.success(`Welcome to Auth App`)
    }

    if (user) {
        navigate('/profile');
    }

    if (loading || googleLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='min-h-screen'>
            <div className="card flex justify-center">
                <div className="card-body w-11/12 md:w-4/12 mx-auto bg-gray-500 text-gray-50 rounded-lg m-4 mt-10">
                    <h2 className='text-3xl text-center font-semibold'>Sign Up</h2>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => signInWithGoogle()}
                            className="btn btn-outline w-full text-gray-50 hover:bg-success hover:border-0 mt-6"><FcGoogle className='mr-2 text-xl'></FcGoogle>Google</button>
                    </div>

                    <div className="divider text-white">OR</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full">
                            <label className='ml-2 font-semibold' htmlFor="name">Name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="input input-bordered w-full text-black"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'Please Enter Name'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.name && <span className="label-text text-base font-semibold text-red-400">{errors.name.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className='ml-2 font-semibold' htmlFor="name">Place</label>
                            <input
                                type="text"
                                placeholder="Place"
                                className="input input-bordered w-full text-black"
                                {...register("place", {
                                    required: {
                                        value: true,
                                        message: 'Please Enter Place'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.place && <span className="label-text text-base font-semibold text-red-400">{errors.place.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className='ml-2 font-semibold' htmlFor="phone">Phone Number</label>
                            <input

                                type="number"
                                placeholder="Phone Number"
                                className="input input-bordered w-full text-black"
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
                                {errors.phone && <span className="label-text text-base font-semibold text-red-400">{errors.phone.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className='ml-2 font-semibold' htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className={`input input-bordered w-full text-black ${errors.email && 'focus:border-red-400 focus:ring-red-400 border-2 border-red-400'}`}
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
                                {errors.email?.type === 'required' && <span className="label-text text-base font-semibold text-red-400">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text text-base font-semibold text-red-400">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full relative">
                            <label className='ml-2 font-semibold' htmlFor="password">Password</label>
                            <input
                                type={passwordShow ? 'text' : 'password'}
                                placeholder="Your Password"
                                className={`input input-bordered w-full text-black ${errors.password && 'focus:border-red-400 focus:ring-red-400 border-2 border-red-400'}`}
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
                                {errors.password && <span className="label-text text-base font-sem text-red-400">{errors.password.message}</span>}
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
                                className={`input input-bordered w-full text-black ${errors.confirmPassword && 'focus:border-red-400 focus:ring-red-400 border-2 border-red-400'}`}
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
                                {errors.confirmPassword && <span className="label-text text-base font-semibold text-red-400">{errors.confirmPassword.message}</span>}
                            </label>
                        </div>
                        {errorMessage}
                        <div className='flex item-center gap-1'>
                            <input
                                onClick={() => setAgree(!agree)}
                                className='w-5 h-5 rounded-full'
                                type="checkbox" name="terms" id="" />
                            <label className='ml-1 pb-2 text-gray-50 text-sm md:text-base' htmlFor="terms">I agree with the <span className='font-semibold text-gray-50 cursor-pointer'>terms and conditions</span></label>
                        </div>

                        <p className='text-center'>Already have an account? <Link className='text-success' to='/login'>Login</Link> </p>
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