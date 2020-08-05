import React, { createContext, useState } from 'react';


export const TextContext = createContext()

export const TextContextProvider = props => {
    const [text, setText] = useState('');

    return (
        <TextContext.Provider value={[ text, setText ]}>
            {props.children}
        </TextContext.Provider>
    )
}