import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import BASE_URL from '../config';
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { SpinnerDotted } from 'spinners-react';


const Home = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('medium')
    const [editId, setEditId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [editValue, setEditValue] = useState('')
    const navigate = useNavigate();
    const [isAdding, setIsAdding] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchData = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem('userId'));
            const fetchedData = await axios.post(`${BASE_URL}/todo/`, { userId });
            setTodos(fetchedData.data.todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsAdding(true);
            const userId = JSON.parse(localStorage.getItem('userId'));
            const response = await axios.post(`${BASE_URL}/todo/add/${userId}`, { task, priority });
            setTodos([...todos, response.data.todo]); // Assuming the backend returns the added todo
            setTask('');
            setPriority('medium');
            toast.success(`${response.data.message}`);
        } catch (error) {
            console.error('Error adding todo:', error);
        } finally {
            setIsAdding(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setDeleteId(id);
            setIsDeleting(true);
            const response = await axios.delete(`${BASE_URL}/todo/delete/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
            toast.success(`${response.data.message}`);
        } catch (error) {
            console.error('Error deleting todo:', error);
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    }

    const handleEdit = async (todo) => {
        setEditId(todo._id);
        setEditValue(todo.task)
    }

    const handleUpdate = async () => {
        const response = await axios.put(`${BASE_URL}/todo/update/${editId}`, { task: editValue });
        toast.success(`${response.data.message}`);
        fetchData();
        setEditId(null);
    }

    const getColor = (priority) => {
        switch (priority) {
            case 'low':
                return 'text-green-500';
            case 'medium':
                return 'text-orange-500';
            case 'high':
                return 'text-red-700';
            default:
                return 'text-gray-600';
        }
    }

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('userId'));
        if (!userId) {
            console.log(userId)
            navigate('/login');
        }
        fetchData();
    }, [])



    return (
        <div className='bg-slate-700 pt-2 min-w-screen min-h-screen'>
            <Header />
            <div className='mt-10'>
                <form
                    onSubmit={handleSubmit}
                    className='w-screen md:flex-row justify-center items-center flex flex-col pt-8 gap-4'>
                    <input type="text" placeholder='Add new task' required
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className='border py-2 px-4 rounded-lg border-pink-600' />
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        id="priority" className="bg-gray-50 border cursor-grab py-2 px-16 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    {isAdding ?
                        <span className='px-20 py-2 scale-[1.05] rounded-lg bg-opacity-90  bg-pink-600 flex'><SpinnerDotted size={23} thickness={128} speed={199} color="rgba(255, 255, 255, 1)" /></span>
                        : <button className='bg-pink-600  text-white px-16 py-2 rounded-lg active:scale-95 hover:scale-105 transition-all  duration-300'>Add task</button>}
                </form>

                <div className='w-screen  justify-center items-center flex mt-10'>

                    <div className="w-3/4 flex flex-col gap-3 px-5 py-3">
                        {
                            todos.length > 0 && todos.map((todo) => (
                                <div key={todo._id} className='flex justify-between py-3 px-3 bg-white  hover:scale-[1.02] transition-all duration-300 rounded-lg'>
                                    <div className={`flex-1 flex gap-2 text-lg font-semibold items-center w-full  ${getColor(todo.priority)}`}>
                                        {editId != todo._id ? <p className='break-words overflow-hidden  w-11/12'>{todo.task}</p> :
                                            <input type="text" className='w-full outline-none'
                                                onChange={(e) => { setEditValue(e.target.value) }} value={editValue} autoFocus
                                                onKeyDown={e => { if (e.key === "Enter") handleUpdate() }} />}
                                    </div>
                                    <div className='flex items-center text-pink-600 gap-5'>
                                        {editId == todo._id ? <FaCheck onClick={handleUpdate} /> :
                                            <MdOutlineEdit onClick={() => { handleEdit(todo) }}
                                                className='hover:-rotate-45 transition-all duration-300' />}

                                        {(isDeleting && deleteId === todo._id) ?
                                            <SpinnerDotted size={20} thickness={128} speed={259} color="rgba(219, 39, 119, 1)" />
                                            : <FaTrashAlt onClick={() => { handleDelete(todo._id) }}
                                                className='hover:scale-110 transition-all duration-300 cursor-pointer' />
                                        }
                                    </div>
                                </div>
                            ))
                        }


                    </div>


                </div>

            </div>
        </div>
    )
}

export default Home
