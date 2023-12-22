import React, { useState, useEffect } from "react";
import UseTask from "../../Hooks/UseTask";
import Loading from "../Loading/Loading";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-modal"; 
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
const Lists = () => {
  const { isLoading, data, refetch } = UseTask();
  const [selectedTask, setSelectedTask] = useState(null);
  console.log(data);

  const [lists, setLists] = useState({
    "to-do": [],
    ongoing: [],
    completed: [],
  });


  const openModal = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };


  useEffect(() => {
    if (!isLoading) {
      const initialData = data;

      setLists({
        "to-do": initialData.filter((task) => task.status === "to-do"),
        ongoing: initialData.filter((task) => task.status === "ongoing"),
        completed: initialData.filter((task) => task.status === "completed"),
      });
    }
  }, [isLoading, data]);

  const handleDragStart = (e, listId, itemId) => {
    e.dataTransfer.setData("listId", listId);
    e.dataTransfer.setData("itemId", itemId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, newListId) => {
    e.preventDefault();
  
    const sourceListId = e.dataTransfer.getData("listId");
    const sourceItemId = e.dataTransfer.getData("itemId");
  
  
    if (newListId !== sourceListId) {
      setLists((prevLists) => {
        const movedItem = prevLists[sourceListId].find(
          (item) => item._id === sourceItemId
        );
  
        updateServer(newListId, sourceItemId);
  
        const newLists = {
          ...prevLists,
          [sourceListId]: prevLists[sourceListId].filter(
            (item) => item._id !== sourceItemId
          ),
          [newListId]: [...prevLists[newListId], movedItem],
        };
  
        return newLists;
      });
    }
  };
  

  const updateServer = async (newListId, movedItemId) => {
    console.log(newListId, movedItemId);
    try {
      const response = await axios.put(
        `https://tech-task-server-two.vercel.app/tasks/${movedItemId}`,
        { status: newListId }
      );

      if (response.data.acknowledged) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Task Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    } catch (error) {
      console.error("Error in updating", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the task.",
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }


  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {Object.entries(lists).map(([listId, listItems]) => (
      <div
        key={listId}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e, listId)}
        className="border-2 border-blue-600 shadow-lg p-4 m-4 min-w-200 rounded-lg"
        >
          <div className="border-1 rounded-lg bg-blue-600 py-3 mb-4">
            <h3 className="text-lg font-semibold flex justify-center">
              {listId}
            </h3>
          </div>

        {listItems.map((item) => (
          <div
            key={item._id}
            draggable
            onDragStart={(e) => handleDragStart(e, listId, item._id)}
            className="cursor-pointer border-2 flex justify-between rounded-lg shadow-md p-4 my-2 min-h-50 hover:bg-purple-600"
            >

            {item.title}
            <div className="hidden">
              {item.description}
              {item.deadline}
              {item.priority}
                </div>

            <div className="flex">
               
               
                <button className="" onClick={() => openModal(item)}>
                  
                  <FaEye className="text-red-600 text-xl lg:text-2xl" />
                </button>
                <Link to={`/dashboard/update/${item._id}`}>
  <button className="ml-3">
    <CiEdit className="text-red-600 text-xl lg:text-2xl" />
  </button>
</Link>

                
              </div>

          </div>
        ))}
  
    </div>

    ))}

<Modal
  isOpen={selectedTask !== null}
  onRequestClose={closeModal}
  style={{
    content: {
      top: "50%",
      width:"50%",
      backgroundColor:"CaptionText",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  }}
>
<h2 className="text-xl md:text-2xl lg:text-4xl flex justify-center font-bold mb-4 text-blue-600"><span className="px-2">Title:</span>{selectedTask?.title}</h2>
<h2 className="text-xl md:text-2xl lg:text-4xl flex justify-start font-bold mb-4 text-blue-600"><span className="px-2">Description:</span>{selectedTask?.description}</h2>
<h2 className="text-xl md:text-2xl lg:text-4xl flex justify-start font-bold mb-4 text-blue-600"><span className="px-2">Deadline:</span>{selectedTask?.deadline}</h2>
<h2 className="text-xl md:text-2xl lg:text-4xl flex justify-start font-bold mb-4 text-blue-600"><span className="px-2">Priority:</span><span className="text-red-600">{selectedTask?.priority}</span> {selectedTask?.Priority}</h2>
       
        <div className="flex justify-center">
        <button className="btn " onClick={closeModal}>
          Close
        </button>
        </div>
        
      </Modal>
  </div>
  
  );
};

export default Lists;