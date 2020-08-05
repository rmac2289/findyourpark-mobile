import React, { createContext, useState } from 'react';


export const ActivityContext = createContext()
export const ActivitiesContext = createContext();

export const ActivityContextProvider = props => {
    const [showActivities, setShowActivities] = useState(false);
    const [activities, setActivities] = useState([])

    return (
        <ActivitiesContext.Provider value={[activities, setActivities]}>
        <ActivityContext.Provider value={[showActivities, setShowActivities]}>
            {props.children}
        </ActivityContext.Provider>
        </ActivitiesContext.Provider>
    )
}


