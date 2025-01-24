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


const Home = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('medium')
    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState('')
    const navigate = useNavigate();

    const fetchData = async()=>{
        try {
            const userId = JSON.parse(localStorage.getItem('userId'));
            const fetchedData = await axios.post(`${BASE_URL}/todo/`,{userId});
            setTodos(fetchedData.data.todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = JSON.parse(localStorage.getItem('userId'));
            const response = await axios.post(`${BASE_URL}/todo/add/${userId}`, { task, priority});
            setTodos([...todos, response.data.todo]); // Assuming the backend returns the added todo
            setTask('');
            setPriority('medium');
            toast.success(`${response.data.message}`);
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response =  await axios.delete(`${BASE_URL}/todo/delete/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
            toast.success(`${response.data.message}`);
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    const handleEdit = async(todo)=>{
        setEditId(todo._id);
        setEditValue(todo.task)
    }

    const handleUpdate = async()=>{
        const response = await axios.put(`${BASE_URL}/todo/update/${editId}`, {task:editValue});
        toast.success(`${response.data.message}`);
        fetchData();
        setEditId(null);
    }

    const getColor=(priority)=>{
        if(priority==='low') return "text-green-500";
        else if(priority==='medium') return "text-orange-500";
        else return  "text-red-600";
    }

    useEffect(()=>{
        const userId = JSON.parse(localStorage.getItem('userId'));
        if(!userId){
            console.log(userId)
            navigate('/login');
        }
        fetchData();
    },[])



    return (
        <div className='bg-slate-700 h-screen'>
            <Header />
            <div>
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
                        id="priority" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button className='bg-pink-600  text-white px-4 py-1 rounded-lg active:scale-110 transition-all  duration-300'>Add task</button>
                </form>

                <div className='w-screen  justify-center items-center flex mt-10'>

                    <div className="shadow-md rounded-lg w-3/4 flex flex-col gap-3 px-5 py-3 bg-gray-200 ">
                    {
                        todos.length>0 && todos.map((todo)=>(
                            <div key={todo._id} className='flex justify-between py-3'>
                                <div className={`flex-1  flex gap-2 items-center ${getColor(todo.priority)}`}>
                                    {/* <MdOutlineCheckBoxOutlineBlank className='text-black'/>  */}
                                    {editId!=todo._id ? <p className='text-wrap'>{todo.task}</p>:
                                    <input type="text" className='w-full outline-none' 
                                    onChange={(e)=>{setEditValue(e.target.value)}} value={editValue} autoFocus
                                    onKeyDown={e=>{if(e.key==="Enter") handleUpdate()}}/>}
                                </div>
                                <div className='flex items-center text-pink-600 gap-5'>
                                    {editId==todo._id?<FaCheck onClick={handleUpdate}/>:
                                    <MdOutlineEdit onClick={()=>{handleEdit(todo)}}
                                    className='hover:-rotate-45 transition-all duration-300'/>}
                                    <FaTrashAlt onClick={()=>{handleDelete(todo._id)}}
                                        className='hover:scale-110 transition-all duration-300'/>
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
