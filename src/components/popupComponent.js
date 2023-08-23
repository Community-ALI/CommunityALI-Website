import React from "react";

export default function PopupComponent(props) {
  const isShowingPopup = props.isShowingPopup;

  function hidePopups() {
    props.SetIsShowingPopupFalse();
  }
  if (isShowingPopup) {
    return (
      <div>
        {props.popupToRender}
        <div
          id="login-popup-background"
          className={isShowingPopup ? "" : "hidden"}
          onClick={hidePopups}
          style={{ cursor: "pointer" }}
        ></div>
      </div>
    );
  }
}
