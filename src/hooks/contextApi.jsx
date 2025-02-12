import { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';



const Context = createContext()

const ContextProvider = ({ children }) => {
    const [user,setUser]=useState(()=>{
        const savedUser=localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    })
    const [projects,setProjects]=useState([])
    const [comment,setComment] = useState([])
    const [developers,setDevelopers]= useState([])
    const [data,setData]= useState([])
    const [bugs,setBugs]= useState([])
    const [users,setUsers]= useState(null)
    const [supportRequests,setSupportRequests]= useState([])

    const value = useMemo(() => ({
        projects,setProjects,
        comment,setComment,
        developers,setDevelopers,
        data,setData,
        user,setUser,
        bugs,setBugs,
        users,setUsers,
        supportRequests,setSupportRequests,
      }), [user,setUser,projects, setProjects,developers,setDevelopers,comment,setComment,bugs,setBugs,supportRequests,setSupportRequests,users,setUsers,data,setData]);

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