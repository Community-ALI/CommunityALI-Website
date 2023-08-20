import React, { useEffect, useState } from "react";
import { BASE_BACKEND_URL } from "../../config";

function Message(props) {
  const message = props.message;
  return (
    <div>
      <p>{message.createdAt}</p>
      <div className="bg-[#001E60] text-white p-4">
        <h1 className="mb-6">{message.title + ":"}</h1>
        <p>{message.content}</p>
      </div>
    </div>
  );
}

function MessageForm(props) {
  const [message, setMessage] = useState({
    content: "",
    title: "UPDATE:",
    senderId: props.senderId,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const postData = async function () {
      try {
        fetch(`${BASE_BACKEND_URL}/messagedata/post_message`, {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(message),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.error) {
              console.error("Error:", data.error);
            } else {
              console.log("Message successfully sent");
              window.location.reload();
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
    setMessage({ ...message, [name]: value });
  };

  return (
    <div className="bg-[#001E60]">
      <form onSubmit={handleSubmit}>
        <input type="text" name="content" onChange={handleInputChange} />
        <button type="submit" className="bg-[#ECAA1E]">
          <img src="Photos/Send_fill.png" alt="" />
        </button>
      </form>
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

  //TODO: reverse scroll on message flex box
  return (
    <div className="flex flex-col flex-1 max-h-[100%]">
      <div className="bg-[#001E60] h-[126px] text-white flex p-4 items-center">
        <h1>{props.serviceTitle}</h1>
      </div>
      <div className="bg-[#00468D] flex-1 flex overflow-scroll w-[100%] 
        flex-col-reverse p-4 px-8">
        {messages.map((message) => {
          return <Message message={message} key={message._id} />;
        })}
      </div>
      <div>
        <MessageForm senderId={props.senderId} />
      </div>
    </div>
  );
}
