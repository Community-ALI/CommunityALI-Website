import React, { useRef, useEffect, useState } from "react";
import { BASE_BACKEND_URL } from "../../config";

function Message(props) {
  const message = props.message;
  const content = message.content.split("\n");

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const now = new Date();
  
    const isSameDay = date.getDate() === now.getDate() &&
                     date.getMonth() === now.getMonth() &&
                     date.getFullYear() === now.getFullYear();
  
    const timeDiffInDays = (now - date) / (1000 * 60 * 60 * 24); // Calculate the difference in days
  
    if (isSameDay) {
      // If it's today, return the time in 12-hour format
      const hours = date.getHours() % 12 || 12; // Get hours in 12-hour format
      const amPm = date.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM or PM
      return `${hours}:${String(date.getMinutes()).padStart(2, '0')} ${amPm}`;
    } else if (timeDiffInDays <= 7) {
      // If it's within the last 7 days, return the time in 12-hour format, month, and day
      const hours = date.getHours() % 12 || 12; // Get hours in 12-hour format
      const amPm = date.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM or PM
      // Return the time in 12-hour format, month, and day
      return `${hours}:${String(date.getMinutes()).padStart(2, '0')} ${amPm} ${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
    } else if (now.getFullYear() === date.getFullYear()) {
      // If it's within the same year, return the month and day
      return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
    } else if (now.getFullYear() - date.getFullYear() === 1 && now.getMonth() === date.getMonth()) {
      // If it's less than a year ago but has the same month, treat it as older than a year
      return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`;
    } else {
      // If it's more than a year ago or in a different month, return the full date (month, day, year)
      return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`;
    }
  }

  return (
    <div>
      <p className="text-center text-white mb-[5px] text-xs">{formatDate(message.createdAt)}</p>
      <div className="bg-[#001E60] rounded-lg text-white p-4 mb-[20px]">
        <p>
          {content.map((line, index) => {
            return (
              <span key={index}>
                {line}
                <br />
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}

function MessageForm(props) {
  const [message, setMessage] = useState({
    content: "",
    senderId: props.senderId,
  });

  const [isSingleLine, setIsSingleLine] = useState(true);
  const textareaRef = useRef(null);
  const charLimit = 10000;

  function resizeTextarea() {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    console.log(textareaRef.current.scrollHeight);
    setIsSingleLine(textareaRef.current.scrollHeight >= 24 ? false : true);
  }

  const clearInput = () => {
    setMessage({ ...message, ["content"]: "" });
    textareaRef.current.style.height = "auto";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const postingMessage = message;
    clearInput();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Not loggod in");
      return;
    }
    const postData = async function () {
      try {
        console.log("Posting message to database: ", postingMessage.content);
        await fetch(`${BASE_BACKEND_URL}/messagedata/post_message`, {
          method: "POST",
          headers: {
             "authorization": `Bearer ${token}`,
             "content-Type": "application/json"
             },
          body: JSON.stringify(postingMessage),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.error) {
              console.error("Error:", data.error);
            } else {
              console.log("Message successfully sent");
              props.updateMessages();
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    };

    postData();
  };

  // TODO: this is unecessary, remove it and prevent users from
  // sending messages their _id is undefined
  function updateSenderId() {
    setMessage({ ...message, ["senderId"]: props.senderId });
  }

  useEffect(() => {
    updateSenderId();
  }, [props.senderId]);

  const handleInputChange = (event) => {
    const { name, value } = {
      name: event.target.name,
      value: event.target.value,
    };
    if (value.length > 10000) return;
    setMessage({ ...message, [name]: value });
    resizeTextarea();
  };

  return (
    <div>
      <p
        className={`text-white text-xs pb-2`}
      >{`Character limit: (${message.content.length}/${charLimit})`}</p>
      <div className="bg-[#001E60] rounded-lg">
        <form
          onSubmit={handleSubmit}
          className={`flex items-start ${isSingleLine ? "max-h-[52px]" : ""}`}
        >
          <textarea
            ref={textareaRef}
            type="text"
            rows="1"
            className="bg-transparent box-border text-white flex-1 resize-none overflow-y-scroll my-[14px] px-4"
            value={message.content}
            placeholder="Message..."
            name="content"
            onChange={handleInputChange}
          />
          <button type="submit" className="bg-[#ECAA1E] rounded-lg">
            <img src="Photos/Send_fill.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function MessagingUI(props) {
  const [messages, setMessages] = useState([
    {
      title: "Loading",
      content: "",
      _id: "Loading",
      createdAt: "Loading",
    },
  ]);

  const messagesContainer = useRef(null);

  function scrollToBottom() {
    messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  async function fetchMessages() {
    try {
      console.log("fetching database with id: " + props.senderId);
      const response = await fetch(
        `${BASE_BACKEND_URL}/messagedata/get_service_messages/${props.senderId}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            console.error(data.error);
          } else {
            console.log(`Fetched ${data.length} many messages`);
            setMessages(data);
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (props.senderId) fetchMessages();
    else {
      console.log("Sender id is undefined");
    }
  }, [props.senderId]);

  return (
    <div className="flex flex-col flex-1 max-h-[100%]">
      <div className="bg-[#001E60] h-[126px] text-white flex gap-4 p-4 items-center
      border-y-0 border-ali-backgroundblue border-opacity-50 border-b-2 lr:py-0 sm:h-[100px] sm:mt-[60px]">
        {props.isMobile && (
          <button onClick={props.BackMobileButton}>
            <img src="Photos/BackArrow.png" alt="" />
          </button>
        )}
        <img
          src={
            props.serviceImage
              ? props.serviceImage
              : "Photos/DefaultServiceImage.png"
          }
          alt=""
          className="rounded-lg h-[82px] sm:h-[60px]"
        />
        <h1 className="text-[18px] font-[500] sm:text-[16px]">{props.serviceTitle}</h1>
      </div>
      <div
        className="bg-[#00468D] flex-1 flex overflow-auto overflow-x-hidden
        w-[100%] flex-col-reverse p-4 px-8 gap-4" ref={messagesContainer}
       >
        {messages.map((message) => {
          return <Message message={message} key={message._id} />;
        })}
      </div>
      {props.canSendMessages && (
        <div className="bg-[#00468D] p-4 px-8 pb-8">
          <MessageForm
            senderId={props.senderId}
            updateMessages={fetchMessages}
          />
        </div>
      )}
    </div>
  );
}
