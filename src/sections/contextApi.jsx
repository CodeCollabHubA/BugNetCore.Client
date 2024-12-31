import { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';



const Context = createContext()

const ContextProvider = ({ children }) => {
    const [projects,setProjects]=useState([])
    const [comment,setComment] = useState([])


    const value = useMemo(() => ({
        projects,
        setProjects,
        comment,
        setComment,
        user,
        setUser
      }), [projects, setProjects,comment,setComment]);

    return (
        <Context.Provider
            value={value}
        >
            {children}
        </Context.Provider>
    );
}

export const useMyContext = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error("useMyContext must be used within a ContextProvider");
    }
    return context;
};

export default ContextProvider;

ContextProvider.propTypes = {
    children: PropTypes.object.isRequired,
  };