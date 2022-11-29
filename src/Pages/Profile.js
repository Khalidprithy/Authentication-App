import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Profile = () => {


    const [users, setUsers] = useState();
    const [tempUsers, setTempUsers] = useState();
    const [changed, setChanged] = useState(false);
    console.log(users?.name)

    useEffect(() => {
        console.log('users', users)
        console.log('temp users', tempUsers)
    })

    const user = getAuth();

    const email = user?.currentUser?.email


    useEffect(() => {
        const email = user?.currentUser?.email;
        const url = `https://authentication-server.onrender.com/user/${email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => (
                setUsers(data),
                setTempUsers(data)
            ))
    }, []);


    const handleEditFaq = () => {

        const updatedProfile = {
            name: tempUsers.name,
            phone: tempUsers.phone,
            place: tempUsers.place,
        }
        const url = `https://authentication-server.onrender.com/user/${email}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProfile)
        })
            .then(res => res.json())
            .then(data => {
                setUsers(data)
                toast.success("Successful")
                setChanged(false)
                // navigate('/faq')
            })
            .catch(error => {
                toast.error(error)
            })
    }


    return (
        <div className='min-h-screen'>
            <div className="card flex justify-center items-center">
                <div className="card-body w-11/12 md:w-4/12 mx-auto bg-gray-500 text-gray-50 rounded-lg m-4 mt-10">
                    <h1 className='text-4xl font-semibold mt-6 text-center'>Update Your Profile</h1>
                    <p className='text-center pt-4'>{tempUsers?.email}</p>

                    <div className='m-4 lg:m-10'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col'>
                                <label className='text-xl font-semibold' htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id='name'
                                    className='w-full m-1 text-black px-3 py-2 border border-orange-300 rounded'
                                    value={tempUsers?.name}
                                    onChange={(e) => {
                                        setChanged(true)
                                        setTempUsers({
                                            ...tempUsers,
                                            name: e.target.value,
                                        })
                                    }}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-xl font-semibold' htmlFor="place">Place</label>
                                <input
                                    type="text"
                                    id='place'
                                    className='w-full m-1 text-black px-3 py-2 border border-orange-300 rounded'
                                    value={tempUsers?.place}
                                    onChange={(e) => {
                                        setChanged(true)
                                        setTempUsers({
                                            ...tempUsers,
                                            place: e.target.value,
                                        })
                                    }}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-xl font-semibold' htmlFor="answer">Phone</label>
                                <textarea
                                    type="text"
                                    id='answer'
                                    className='w-full m-1 text-black px-3 py-2 border border-orange-300 rounded'
                                    value={tempUsers?.phone}
                                    onChange={(e) => {
                                        setChanged(true)
                                        setTempUsers({
                                            ...tempUsers,
                                            phone: e.target.value,
                                        })
                                    }}
                                />
                            </div>
                        </div>
                        {
                            changed && <div className='flex justify-end'>
                                <button
                                    onClick={(e) => {
                                        setTempUsers({ ...users })
                                    }}
                                    className='btn btn-sm bg-orange-400 hover:bg-orange-600 border-0 ml-2 mt-5'>Cancel</button>
                                <button
                                    onClick={handleEditFaq}
                                    className='btn btn-sm bg-orange-400 hover:bg-orange-600 border-0 ml-2 mt-5'>Save</button>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;