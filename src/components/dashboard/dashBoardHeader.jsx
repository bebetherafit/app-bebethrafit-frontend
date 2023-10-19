import React from 'react';
import '../../styles/dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function DashBoardHeader() {
    return (
        <div className="dashBoardHeader">
            <FontAwesomeIcon icon={faBell} className='bells' />
        </div>
    );
}

export default DashBoardHeader;