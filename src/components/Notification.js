import '../../public/stylesheets/style.css';
import React from 'react';

function Notifications(props) {
    if (props.notifications != null && props.notifications > 0) {
        if (props.isRedDot) {
            return (
                <div
                    className={'red-notification-icon'
                        + ((props.styleLeft) ? ' position-left' : '')}
                ></div>
            )
        }
        return (
            <div
                className={'notification-icon' + ((props.styleLeft) ? ' position-left' : '')}
            >
                <div>{props.notifications}</div></div>
        )
    } else {
        return null;
    }
}

export default Notifications;
