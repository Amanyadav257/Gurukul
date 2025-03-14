import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { Avatar, Button, Input } from '@material-ui/core';
import { Modal } from 'react-responsive-modal';
import { useAlert } from 'react-alert';
import {
  Home as HomeIcon,
  FeaturedPlayListOutlined as FeaturedPlayListOutlinedIcon,
  AssignmentTurnedInOutlined,
  NotificationsOutlined,
  PeopleAltOutlined,
  Search,
  ExpandMore,
  Close as CloseIcon,
} from '@material-ui/icons';

import { logout, selectUser } from '../../redux/features/userSlice';
import 'react-responsive-modal/styles.css';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [question, setQuestion] = useState('');

  const dispatch = useDispatch();
  const alert = useAlert();
  const user = useSelector(selectUser);
  const navigate = useNavigate(); 

  //handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };
  

  // Function to handle add question
  const handleAddQuestion = async () => {
    if (question !== '') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = {
        questionName: question,
        questionUrl: inputUrl,
        user: user,
      };
  
      try {
        await axios.post('http://localhost:9002/api/questions', body, config);
        alert.success('Question submitted');
        handleCloseModal(); // Close modal and refresh the page
      } catch (error) {
        alert.error('Error in adding question');
      }
    }
  };
  

  return (
    <div className="flex items-center bg-white sticky z-50 shadow-sm top-0 justify-center p-[3px]">
      <div className="flex items-center justify-between">
        <div className="flex">
          <span className="text-#1b2430-500 text-lg font-semibold mr-5">GURUKUL</span>
        </div>
  
        <div className="hidden md:flex items-center border-2 rounded-lg border-solid border-gray-300 p-[5px] ml-[5px]">
          <Search />
          <input className="bg-transparent outline-none border-none" type="text" placeholder="Search.." />
        </div>

        <div className="flex items-center ml-[25px]">
          <span >
            <Avatar src={user?.photo} />
          </span>

          <button
            className="px-2 py-1 rounded-lg ml-1 bg-#1b2430-300 hover:bg-#1b2430-500"
            onClick={() => setIsModalOpen(true)}
          >
            Add Question
          </button>
          <Modal
            open={isModalOpen}
            closeIcon={<CloseIcon />}
            onClose={() => setIsModalOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: 'auto',
                width: 'auto',
              },
            }}
          >
            <div className="flex items-center mb-2 border-b-2 border-solid border-gray-800/5 rounded-md">
              <h5 className="text-#1b2430-400 text-lg cursor-pointer font-semibold mr-[30px]">Add Question</h5>
              <h5 className="text-#1b2430-400 text-lg cursor-pointer font-semibold mr-[30px]">Share Link</h5>
            </div>
            <div className="flex items-center mt-[30px]">
              <Avatar src={user?.photo} className="avatar" />
              <div className="flex items-center text-gray-600 p-1 ml-2 bg-white rounded-3xl cursor-pointer">
                <PeopleAltOutlined />
                <p className="ml-2 text-sm text-gray-700">Public</p>
                <ExpandMore />
              </div>
            </div>
            <div className="flex flex-col mt-[30px]">
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                type="text"
                placeholder="Ask your question.."
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Input
                  type="text"
                  value={inputUrl}
                  placeholder="Optional: Add Image URL"
                  onChange={(e) => setInputUrl(e.target.value)}
                />
                {inputUrl !== '' && (
                  <img style={{ height: '40vh', objectFit: 'contain' }} src={inputUrl} alt="displayimage" />
                )}
              </div>
            </div>
            <div className="flex flex-col-reverse mt-2 items-center">
              <button
                className="mt-2 border-none outline-none text-gray-400 text-bold p-2 rounded-3xl cursor-pointer hover:text-red"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleAddQuestion}
                 type="submit"
                 className="mt-2 border-none outline-none text-#1b2430-500 text-bold p-2 rounded-3xl cursor-pointer hover:text-#1b2430-800 w-1/2"
              >
               Add Question
              </button>

            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Header;
