import React, { useState } from 'react';
import { Avatar } from "@material-ui/core";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  // ChatBubbleOutlined,
  MoreHorizOutlined,
  // RepeatOneOutlined,
  ShareOutlined,
} from "@material-ui/icons";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import CloseIcon from "@material-ui/icons/Close";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactTimeAgo from "react-time-ago";
import ReactHtmlParser from "html-react-parser";
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectUser } from '../../redux/features/userSlice';
import { useAlert } from 'react-alert';

const LastSeen = ({ date }) => {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" timeStyle='round' />
    </div>
  );
};

const Post = ({ post }) => {
  const alert = useAlert();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showAnswers, setShowAnswers] = useState(false);
  const Close = <CloseIcon />;

  const user = useSelector(selectUser);

  const handleQuill = (value) => {
    setAnswer(value);
  };

  const handleShowAnswers = () => {
    setShowAnswers((curr) => !curr);
  };

  //handle upvote
  const [likeCount, setLikeCount] = useState(0);

  const handleUpvote = () => {
    setLikeCount(likeCount + 1);
  };

//handle downvote
const [dislikeCount, setdislikeCount] = useState(0);

const handleDownVote = () => {
  setdislikeCount(dislikeCount + 1);
};

 //handle close modal
 const handleCloseModal = () => {
  setIsModalOpen(false);
  window.location.reload();
};

// Function to handle answer submission
const handleAnswer = async () => {
  if (post?._id && answer !== "") {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = {
      answer: answer,
      questionId: post?._id,
      user: user,
    };
    try {
      await axios.post("http://localhost:9002/api/answers", body, config);
      alert.success("Answer added successfully");
      handleCloseModal();
    } catch (error) {
      alert.error("Error submitting the answer. Please try again.");
    }
  }
};

//handle share
const handleShare = () => {
  const subject = 'Check out this post';
  const answer = post?.allAnswers?.[0];
  const answerContent = answer ? answer.answer : '';
  const cleanedAnswerContent = answerContent.replace(/<\/?p>/g, ''); // Remove <p> and </p> tags
  const body = `Check out this problem solution:\n\n${post?.questionName}\n\n${cleanedAnswerContent}`;
  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoLink);
};



  return (
    <div className='flex flex-col p-2 bg-white mt-2 border-2 border-solid border-gray-100 rounded-sm max-w-[700px] shadow-sm'>
      <div className="flex items-center">
        <Avatar />
        <h4 className="ml-2 cursor-pointer text-xs hover:underline">{post?.user?.userName}</h4>
        <small className="ml-2">
          <LastSeen date={post?.createdAt} />
        </small>
      </div>

      <div className="flex flex-col">
        <div className='m-2 font-bold cursor-pointer flex items-center flex-1'>
          <p className="hover:underline">{post?.questionName}</p>
          <button className="ml-auto cursor-pointer p-2 bg-#1b2430-300 outline-none border-none font-light text-sm rounded-md hover:bg-#1b2430-500 transition-all duration-300 ease-in-out" onClick={() => {
            setIsModalOpen(true);
          }}>Answer</button>
          <Modal
            open={isModalOpen}
            closeIcon={Close}
            onClose={() => setIsModalOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: "auto",
              },
            }}
          >
            <div className="flex flex-col items-center mt-5">
              <h1 className="text-gray-800 font-semibold mb-2">{post?.questionName}</h1>
              <p className="text-gray-500 text-sm">asked by <span className="text-black font-bold">
                {post?.user?.userName}
              </span> on {" "} <span className="text-black font-medium">
                  {new Date(post?.createdAt).toLocaleString()}
                </span></p>
            </div>

            <div className="flex pt-5 flex-1">
              <ReactQuill
                value={answer}
                onChange={handleQuill}
                placeholder="Enter your answer"
              />
            </div>

            <div className="flex items-center justify-between mt-12 w-full">
              <button className="border-none mt-2 outline-none text-gray-500 font-medium rounded-3xl cursor-pointer" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button onClick={handleAnswer} type="submit" className="border-none mt-2 outline-none bg-#1b2430-500  p-1 text-gray-500 font-medium cursor-pointer rounded-3xl">
                Add Answer
              </button>
            </div>
          </Modal>
        </div>
        {post.questionUrl !== "" && <img className="w-full max-h-[400px] object-contain bg-transparent rounded-md cursor-pointer mt-2" src={post.questionUrl} alt="Question" />}
      </div>

      <div className="flex flex-col items-center mt-1">
        <div className='bg-gray-100 w-full mt-1 py-1 px-2 flex items-center justify-between rounded-3xl'>
        <ArrowUpwardOutlined
        className="text-#1b2430-300 cursor-pointer mr-[40px]"
        onClick={handleUpvote}
      />
      <span>{likeCount}</span>
          <ArrowDownwardOutlined 
          className="text-#1b2430-300 cursor-pointer mr-[40px]" 
          onClick={handleDownVote}/> 
          <span>{dislikeCount}</span>
          <ShareOutlined className="text-#1b2430-300 cursor-pointer ml-[30px]" 
          onClick={handleShare}
          />
          <MoreHorizOutlined className="text-#1b2430-300 cursor-pointer ml-[30px]" />
        </div>
        <button onClick={handleShowAnswers} className='text-black/50 text-sm font-bold mx-2'>{post?.allAnswers.length} Answer(s)</button>

        {showAnswers && (
          <div className="mt-1 w-full pt-1 pl-1 border-t-2 border-t-solid border-t-gray-100">
            {post?.allAnswers?.slice(0, 5).map((_a) => (
              <div key={_a?._id} className="flex flex-col border-t-2 border-t-solid border-t-gray-100">
                <div className='flex items-center mb-2 text-sm font-semibold text-gray-800'>
                  <Avatar />
                  <div className="ml-1 my-2">
                    <p>{_a?.user?.userName}</p>
                    <span>
                      <LastSeen date={_a?.createdAt} />
                    </span>
                  </div>
                </div>
                <div>{ReactHtmlParser(_a?.answer)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
