import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import UseTask from '../../Hooks/UseTask';
import axios from 'axios';
import Swal from 'sweetalert2';

const Update = () => {
  const { isLoading, data, refetch } = UseTask();
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const { register, handleSubmit,setValue, reset, formState: { errors } } = useForm();
  

  useEffect(() => {
    
    const selectedTask = data.find((task) => task._id === id);

    // Set the task data as default values for the form
    if (selectedTask) {
      Object.keys(selectedTask).forEach((key) => {
        setValue(key, selectedTask[key]);
      });
      setTask(selectedTask);
    }
  }, [id, data, setValue]);

  const onSubmit = async (formData) => {
    try {
      // Make an Axios PUT request to update the task
      const response = await axios.put(`https://tech-task-server-two.vercel.app/tasks/${id}`, formData);

      if (response.data.acknowledged) {
        Swal.fire({
            title: 'Success!',
            text: 'Task Updated Successfully',
            icon: 'success',
            confirmButtonText: 'Ok'

        });
        refetch(); // Refetch the data to update the UI
      } else {
        // Handle error
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      
      {task && (
        <form  onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input {...register('title', { required: 'Title is required' })} type="text" id="title" className="border rounded w-full py-2 px-3" />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <textarea {...register('description')} id="description" className="border rounded w-full py-2 px-3"></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="deadline" className="block text-gray-700 text-sm font-bold mb-2">Deadline:</label>
          <input {...register('deadline')} type="date" id="deadline" className="border rounded w-full py-2 px-3" />
        </div>

        <div className="mb-4">
          <label htmlFor="priority" className="block text-gray-700 text-sm font-bold mb-2">Priority:</label>
          <select {...register('priority')} id="priority" className="border rounded w-full py-2 px-3">
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="mt-6">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-purple-500" >Update Task</button>
        </div>
      </form>
      )}
    </div>
  );
};

export default Update;
