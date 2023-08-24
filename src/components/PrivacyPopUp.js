import React from "react";

// make a react component that contains a privacy policy pop up which you can scroll through
export default function PrivacyPopUp(props) {
  return (
    <div className="fixed z-50 top-[20vh] left-[50vw] p-8 bg-white rounded-3xl flex flex-col translate-x-[-50%] inset-0 overflow-y-auto w-[50vw] lr:w-[80vw] lr:h-[75vh] h-[50vh]">
      <div className="flex flex-col flex-grow">
        <iframe className="flex-grow" src="/privacyPolicy.html" />
        {!(
          props.AcceptPrivacyPolicy === undefined &&
          props.DeclinePrivacyPolicy === undefined
        ) && (
          <div>
            <hr className="border-2" />
            <div className="text-ali-darkblue gap-4 flex pt-4">
              <button
                onClick={props.AcceptPrivacyPolicy}
                className="bg-ali-orange rounded-md p-1 font-bold"
              >
                Accept
              </button>
              <button
                onClick={props.DeclinePrivacyPolicy}
                className="bg-ali-orange rounded-md p-1 font-bold"
              >
                Decline
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}