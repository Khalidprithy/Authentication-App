import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import auth from '../firebase.init';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading';
import useToken from '../Shared/useToken';

const Login = () => {

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);
    const [token] = useToken(user || googleUser)

    const [passwordShow, setPasswordShow] = useState(false);
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit } = useForm({
        mode: 'onTouched'
    });
    let errorMessage;

    if (error || googleError) {
        errorMessage = <p className='text-error'>{error?.message || googleError?.message}</p>
    }

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
    }


    if (token) {
        navigate(from, { replace: true });
    }

    if (loading || googleLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='min-h-screen'>
            <div className="card flex justify-center items-center">
                <div className="card-body w-11/12 md:w-4/12 mx-auto bg-gray-500 text-gray-50 rounded-lg m-4 mt-10">
                    <h2 className='text-3xl text-center font-semibold'>Login</h2>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => signInWithGoogle()}
                            className="btn btn-outline w-full text-gray-50 hover:bg-success hover:border-0 mt-6"><FcGoogle className='mr-2 text-xl'></FcGoogle>Google</button>
                    </div>

                    <div className="divider text-white">OR</div>
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
                        <div className="form-control w-full relative">
                            <label className='ml-2 font-semibold mt-2' htmlFor="password">Password</label>
                            <input
                                type={passwordShow ? 'text' : 'password'}
                                placeholder="Your Password"
                                className={`input input-bordered w-full text-black ${errors.password && 'focus:border-red-600 focus:ring-red-600 border-2 border-red-600'}`}
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Please Enter You Password'
                                    }
                                })}
                            />
                            <div className='text-2xl absolute top-11 right-2'>
                                {
                                    (passwordShow === false) ? <AiFillEyeInvisible className='text-gray-700' onClick={() => setPasswordShow(!passwordShow)}></AiFillEyeInvisible> : <AiFillEye className='text-gray-700' onClick={() => setPasswordShow(!passwordShow)}></AiFillEye>
                                }
                            </div>
                            <label className="label">
                                {errors.password && <span className="label-text text-base font-sem text-red-700">{errors.password.message}</span>}
                            </label>
                        </div>
                        {errorMessage}
                        <Link to='/forgot-password'>Forgot Password?</Link>

                        <input
                            className='btn btn-success w-full text-white mt-1 mx-auto transition ease-out duration-300' type="submit" value='Login' />

                        <p className='text-center mt-4'>Does not have an account? <Link className='text-success' to='/signup'>Sign Up</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login