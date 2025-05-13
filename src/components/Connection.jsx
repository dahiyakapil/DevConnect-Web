import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connection = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    const fetchConnections = async () => {
        try {
            const res = await axios(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnections(res.data.data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return null;

    if (connections.length === 0) {
        return <h1 className='text-center text-xl font-semibold mt-6'>No Connections Found</h1>;
    }

    return (
        <div className='text-center my-10'>
            <h1 className='text-2xl text-bold text-center my-6'>Connections</h1>

            {connections.map((connection) => {
                const { firstName, lastName, photoUrl, age, gender, about } = connection;

                return (
                    <div className='flex m-4 p-4 rounded-lg bg-base-300 w-1/4
                     mx-auto'>
                        <div>
                            <img
                                alt="photo" className='w-20 h-20 rounded-full' src={photoUrl} /></div>

                        <div className='text-left mx-4' >
                            <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>

                            {age && gender && <p>{age + " " + gender}</p>}
                            <p>{about}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Connection;
