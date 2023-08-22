import React, { useRef, useEffect, useState } from "react";
import { BASE_BACKEND_URL } from "../../config";

function Message(props) {
  const message = props.message;
  const content = message.content.split("\n");
  return (
    <div>
      <p className="text-center text-white text-xs">{message.createdAt}</p>
      <div className="bg-[#001E60] rounded-lg text-white p-4">
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

  const clearInput = () => {
    setMessage({ ...message, ["content"]: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const postData = async function () {
      try {
        console.log("Posting message to database: ", message.content);
        await fetch(`${BASE_BACKEND_URL}/messagedata/post_message`, {
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
              props.updateMessages();
              clearInput();
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
    setMessage({ ...message, [name]: value });
    resizeTextarea();
  };

  const [isSingleLine, setIsSingleLine] = useState(true);
  const textareaRef = useRef(null);

  function resizeTextarea() {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    console.log(textareaRef.current.scrollHeight);
    setIsSingleLine(textareaRef.current.scrollHeight >= 24 ? false : true);
  }

  return (
    <div>
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
      <div className="bg-[#001E60] h-[126px] text-white flex p-4 items-center">
        <img
          src={
            props.serviceImage
              ? props.serviceImage
              : "Photos/DefaultServiceImage.png"
          }
          alt=""
          className="mr-4 h-[82px]"
        />
        <h1>{props.serviceTitle}</h1>
      </div>
      <div
        className="bg-[#00468D] flex-1 flex overflow-scroll overflow-x-hidden
        w-[100%] flex-col-reverse p-4 px-8 gap-4"
      >
        {messages.map((message) => {
          return <Message message={message} key={message._id} />;
        })}
      </div>
      {props.canSendMessages && (
        <div className="bg-[#00468D] p-4 px-8">
          <MessageForm
            senderId={props.senderId}
            updateMessages={fetchMessages}
          />
        </div>
      )}
    </div>
  );
}
