import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';

const Profile = () => {

    const [users, setUsers] = useState();
    const [tempUsers, setTempUsers] = useState();
    console.log(users)

    const user = getAuth();

    const email = user?.currentUser?.email


    useEffect(() => {
        const email = user?.currentUser?.email;
        const url = `http://localhost:5000/user/${email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => (
                setUsers(data),
                setTempUsers(data)
            ))
    }, []);


    return (
        <div className='min-h-screen'>
            <h1 className='text-4xl font-semibold mt-10 text-center'>Profile</h1>

            <div className='card'>
                <h1></h1>
            </div>
        </div>
    );
};

export default Profile;