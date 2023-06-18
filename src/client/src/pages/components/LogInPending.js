import React, { useState } from 'react';

import PropagateLoader from "react-spinners/PropagateLoader";

function LogInPending(){

    const [statusOfTheProcess, setStatusOfTheProcess] = useState(null);
    const [currentAccount, setCurrentAccount] = useState(null);
    

    return(
        <>
            <div className='pendingContainer'>
                <PropagateLoader color="#0066FF" />
            </div>
        </>
    );  
}

export default LogInPending;