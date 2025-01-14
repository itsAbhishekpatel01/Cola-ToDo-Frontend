import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { io } from "socket.io-client";



const Home = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('medium')

    const fetchData = async()=>{
        // backend se data fetch krne ke liye, use axios package
        // earlier we used fetch, which comes with react
        const fetchedData = await axios.get('http://localhost:3000/api/todo');
        setTodos(fetchedData.data.todos); 
    }

    const handleSubmit = async(e)=>{
    e.preventDefault();
    setTodos([...todos, {task, priority, status:'Pending'}]);
    const response = await axios.post('http://localhost:3000/api/todo/add',{task, priority});
    setTask('');
    setPriority('medium');
}

    useEffect(()=>{
        fetchData();
    },[])



    return (
        <>
            <Header />
            <div>
                <form 
                    onSubmit={handleSubmit}
                    className='w-screen justify-center flex mt-20 gap-2'>
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
                    <button
                        className='bg-pink-600  text-white px-4 py-1 rounded-lg active:scale-110 transition-all duration-300'>Add task</button>
                </form>

                <div className='w-screen justify-center items-center flex mt-10 flex-col'>
                    <h1>My Todos</h1>


                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Task name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Priority
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {todos.map((todo) => (
                                    <tr key={todo._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {todo.task}
                                        </th>
                                        <td className="px-6 py-4">
                                            {todo.priority}
                                        </td>
                                        <td className="px-6 py-4">
                                            {todo.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                </div>

            </div>
        </>
    )
}

export default Home