import React, { createContext, useState } from 'react';


export const ParkNameContext = createContext()
export const FullParkNameContext = createContext()

export const ParkNameContextProvider = props => {
    const [parkName, setParkName] = useState('');
    const [fullParkName, setFullParkName] = useState('')

    return (
        <ParkNameContext.Provider value={[ parkName, setParkName ]}>
            <FullParkNameContext.Provider value={[ fullParkName, setFullParkName ]}>
            {props.children}
            </FullParkNameContext.Provider>
        </ParkNameContext.Provider>
    )
}

