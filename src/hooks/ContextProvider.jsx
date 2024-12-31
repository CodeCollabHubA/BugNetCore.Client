import {useContext,createContext, useMemo, useState} from 'react'
import PropTypes from 'prop-types'

const Context = createContext()

export default function ContextProvider({ children }){
    const [data,setData]= useState([])
    const [projects,setProjects]= useState([])
    const [bugs,setBugs]= useState([])
    const [users,setUsers]= useState([])
    const [supportRequests,setSupportRequests]= useState([])

    const value =useMemo(()=>({
        data,setData,
        projects, setProjects,
        bugs,setBugs,
        users,setUsers,
        supportRequests,setSupportRequests,
    }),[projects,setProjects,bugs,setBugs,supportRequests,setSupportRequests,users,setUsers,data,setData])

    return (
        <Context.Provider
            value={value}
        >
            {children}
        </Context.Provider>
    )
}

export const useMyContext = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error("useMyContext must be used within a ContextProvider");
    }
    return context;
};


ContextProvider.propTypes = {
    children: PropTypes.object.isRequired,
  };