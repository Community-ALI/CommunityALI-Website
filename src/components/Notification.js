import '../../public/stylesheets/style.css';
import React from 'react';

function Notifications(props) {
    console.log(props.notifications);
    if (props.notifications > 0){
        return (
            <div
                className='notification-icon'
            >{props.notifications}</div>
        )
    } else {
        return null;
    }
}

export default Notifications;
