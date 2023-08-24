import React from "react";

// make a react component that contains a privacy policy pop up which you can scroll through
export default function PrivacyPopUp(props) {
  return (
    <div className="fixed z-50 top-[15vh] left-[50vw] p-8 bg-white rounded-3xl flex 
    flex-col translate-x-[-50%] inset-0 overflow-y-auto w-[60vw] h-[60vh] lr:w-[70vw] md:top-[15vh] md:w-[80vw] md:h-[65vh] sm:p-6 sm:w-[90vw] ">
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
                className="bg-ali-orange rounded-md px-2 py-1 font-semibold hover:bg-[color:var(--secondary-color)] hover:text-[white] transition duration-300 ease-out"
              >
                Accept
              </button>
              <button
                onClick={props.DeclinePrivacyPolicy}
                className="bg-ali-orange rounded-md px-2 py-1 font-semibold hover:bg-[color:var(--secondary-color)] hover:text-[white]  transition duration-300 ease-out"
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
