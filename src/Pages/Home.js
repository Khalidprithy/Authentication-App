import React from 'react';
import toast from 'react-hot-toast';

const Home = () => {

    const handleToast = () => {
        toast.success('Hello')
    }

    return (
        <div className='min-h-screen'>
            <h1 className='text-4xl font-semibold mt-10 text-center'>Home</h1>
            <div className='flex justify-center items-center'>
                <h4
                    onClick={handleToast}
                    className='btn btn-sm btn-error'>Hello</h4>
            </div>

        </div>
    );
};

export default Home;