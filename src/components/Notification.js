import '../../public/stylesheets/style.css';
import React from 'react';

function Notifications(props) {
    if (props.notifications != null && props.notifications > 0){
        return (
            <div
                className={'notification-icon' + ((props.styleLeft) ? ' position-left' : '')}
            >{props.notifications}</div>
        )
    } else {
        return null;
    }
}

export default Notifications;
