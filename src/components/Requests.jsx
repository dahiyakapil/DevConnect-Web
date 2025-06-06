import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests)

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true })
            dispatch(removeRequest(_id))
        } catch (error) {
            console.log(error)
        }
    }


    const fetchRequests = async () => {
        const res = await axios(BASE_URL +
            "/user/requests/received", { withCredentials: true }
        )
        dispatch(addRequests(res.data.data))
    }

    useEffect(() => {
        fetchRequests()
    }, [])

    if (!requests) return null;

    if (requests.length === 0) {
        return <h1 className='text-center text-xl font-semibold mt-6'>No Requests Found</h1>;
    }


    return (
        <div className='text-center my-10'>
            <h1 className='text-2xl text-bold text-center my-6'>Requests</h1>

            {requests.map((request) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

                return (
                    <div key={_id} className='flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/4
                     mx-auto'>
                        <div>
                            <img
                                alt="photo" className='w-20 h-20 rounded-full' src={photoUrl} /></div>

                        <div className='text-left mx-4' >
                            <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>

                            {age && gender && <p>{age + " " + gender}</p>}
                            <p>{about}</p>
                        </div>

                        <div>
                            <button className="btn btn-primary mx-2" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                            <button className="btn btn-secondary mx-2" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Requests;
