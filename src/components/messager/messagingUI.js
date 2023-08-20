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
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    //TODO: fix 400 error when fetching
    const postData = async function () {
      console.log(message);
      try {
        fetch(`${BASE_BACKEND_URL}/messagedata/post_message`, {
          method: "POST",
          headers: {'content-Type': 'application/json'},
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

  const handleInputChange = (event) => {
    console.log(event.target);
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
  const [messages, setMessages] = useState([]);

  async function fetchMessages() {
    try {
      const response = await fetch(
        `${BASE_BACKEND_URL}/messagedata/get_service_messages`
      ).then((response) => {
        console.log(`Fetched ${response.length}`);
        setMessages(response);
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchMessages;
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <div className="bg-[#001E60] h-[126px] text-white flex p-4 items-center">
        <h1>{props.serviceTitle}</h1>
      </div>
      <div className="flex flex-col flex-1">
        <div className="bg-[#00468D] flex-1 p-4 px-8">
          {messages.map((message) => {
            return <Message message={message} />;
          })}
        </div>
        <div>
          <MessageForm />
        </div>
      </div>
    </div>
  );
}
