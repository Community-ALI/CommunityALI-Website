import React from "react";

function Message(props) {
  const message = props.message;
  return (
    <div>
      <p>{message.timePosted}</p>
      <div className="bg-[#001E60] text-white p-4">
        <h1 className="mb-6">{message.header + ":"}</h1>
        <p>{message.body}</p>
      </div>
    </div>
  );
}

function MessageForm(props) {
  return (
    <div className="bg-[#bg-[#001E60]">
      <input type="text" />
    </div>
  );
}

export default function MessagingUI(props) {
  return (
    <div>
      <div className="">
        <h1>{props.serviceTitle}</h1>
      </div>
      <div>
        {/* <Message /> */}
      </div>
      <div>
        <MessageForm />
      </div>
    </div>
  );
}
