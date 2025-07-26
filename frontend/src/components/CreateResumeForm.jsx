import React from 'react'
import {Input} from './Inputs'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'; // Adjust the path as needed
import { API_PATHS } from '../utils/apiPaths'; // Adjust the path as needed

const CreateResumeForm = () => {
  const[title,setTitle] = React.useState('');
  const [error,setError] = React.useState(null);
  const navigate = useNavigate();
  const handleCreateResume = async (e) => {
    e.preventDefault(); 
    if(!title){
      setError('Title is required');
      return;
    }
    setError("");
    try {
      const response =await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title
      });
      if(response.data?._id){
        navigate(`/resume/${response.data._id}`);
      }
    } catch (error) {
      if(error.response && error.response.data) {
        setError(error.response.data.message || 'Failed to create resume');
      }
      else{
        setError('An unexpected error occurred , please try again later.');
      }
    }
  };

  return (
     <div className = 'w-full max-w-md p-8 bg-white rounded-2xl border border-gray-100 shadow-lg'>
        <h3 className = 'text-2xl font-bold text-gray-900 mb-2'>Create New Resume</h3>
        <p className = 'text-gray-600 mb-8'>
          Give your resume title to get started ,You can customize it later.
        </p>
        <form onSubmit ={handleCreateResume}>
        <Input value = {title} onChange = {({target})=>setTitle(target.value)}
        label = "Resume Title" placeholder='e.g. Prajwal Sallapalli - Software Engineer' type = "text"/>
         {error && <p className = 'text-red-500 text-sm mb-4'>{error}</p>}

         <button className = 'w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text=white font-black rounded-2xl hover:scale-105 hover:shadow-xl hover:shodow-rose-200 transition-all'>
          Create Resume
         </button>
        </form>
     </div>
  );
}

export default CreateResumeForm;