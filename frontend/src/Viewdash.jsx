import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function Viewdash() {
    const [data, setdata] = useState([])
    const navigate = useNavigate();

    const getdata = async () => {
        const response = await axios.get('http://localhost:5555/admin/viewadmin')
            .then((res) => {
                console.log(res)
                setdata(res.data)
            })
            .catch((err) => {
                console.log(err);
            })

    }

    const deleteData = async (id) => {
        const response = await axios.delete(`http://localhost:5555/admin/deleteadmin?id=${id}`)
            .then((res) => {
                console.log(res)
                navigate('/Dashboard')

            })
        console.log(id)
        getdata()
    }

    const updatedata = async (id) => {
        const response = await axios.put(`http://localhost:5555/admin/updatedata?id=${id}`,{withCredentials:true})
            .then((res) => {
                console.log(res)
                sessionStorage.setItem('EditId', res.data.updatee._id)
                sessionStorage.setItem('EditData', data)
            })
        console.log(id)
        navigate('/Editdash')

    }
    useEffect(() => {
        getdata()
    }, [])

    return (

        <div>
         <h1>Work For Employees</h1>     
            <table>
                
                <thead>
                    <tr>
                        <th style={{ padding: '5px', border: '1px solid black' }}>Name</th>
                        <th style={{ padding: '5px', border: '1px solid black' }}>Email</th>
                        <th style={{ padding: '5px', border: '1px solid black' }}>Task</th>
                        <th colSpan='2' style={{ padding: '5px', border: '1px solid black' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((el, index) => (
                        <tr key={index}>
                            <td style={{ padding: '5px', border: '1px solid black' }}>{el.name}</td>
                            <td style={{ padding: '5px', border: '1px solid black' }}>{el.email}</td>
                            <td style={{ padding: '5px', border: '1px solid black' }}>{el.task}</td>
                            <td style={{ padding: '5px', border: '1px solid black' }} onClick={() => { updatedata(el._id) }}><button>Edit</button></td>
                            <td style={{ padding: '5px', border: '1px solid black' }} onClick={() => { deleteData(el._id) }}><button>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Viewdash