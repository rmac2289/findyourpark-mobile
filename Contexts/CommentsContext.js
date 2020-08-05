import React, { createContext, useState } from 'react';


export const CommentsContext = createContext()

export const CommentsContextProvider = props => {
    const [comments, setComments] = useState([]);

    return (
        <CommentsContext.Provider value={[ comments, setComments ]}>
            {props.children}
        </CommentsContext.Provider>
    )
}

