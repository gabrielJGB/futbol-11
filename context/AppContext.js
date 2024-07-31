import React, { createContext, useContext} from 'react';

const AppContext = createContext();

export const AppProvider = ({ value,children }) => {



    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
