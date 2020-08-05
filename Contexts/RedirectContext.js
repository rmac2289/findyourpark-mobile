import React, { createContext, useState } from 'react';

export const RedirectContext = createContext()

export const RedirectContextProvider = props => {
    const [redirect, setRedirect] = useState(null)

    return (
        <RedirectContext.Provider value={[ redirect, setRedirect ]}>
            {props.children}
        </RedirectContext.Provider>
    )
}