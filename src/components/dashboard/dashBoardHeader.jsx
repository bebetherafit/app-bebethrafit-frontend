import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function DashBoardHeader() {
    return (
        <div className="header-bar">
            <FontAwesomeIcon icon={faBell} />
            <div className="alert-circle"></div>
        </div>
    );
}

export default DashBoardHeader;