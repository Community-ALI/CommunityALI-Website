import React from "react";

export default function LoadingUI() {
    return (
        <div className="flex justify-center items-center z-50">
          <div className="w-[30px] h-[30px] border-[4px] border-white animate-ali-spin">
            <div className="bg-white w-[100%] h-[100%] animate-ali-fill origin-top"></div>
          </div>
        </div>
    );
}