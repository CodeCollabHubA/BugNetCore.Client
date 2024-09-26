import PropTypes from 'prop-types';
import React from 'react'
import { Link } from 'react-router-dom'
import BugModal from '../bug/bug-modal'

export default function ConditionalRendering ({path,open,handleClose,children}){
    
  if(path==='ReportCreate')
    return (
        <>
            <BugModal open={open} handleClose={handleClose} bug ={null}/>{children}
        </>
    )
  
  if(path==='liveSuport')
    return (
        <Link to='/'>{children}</Link>
    )
  
  if(path==='bug')
    return (
    
        <Link to='/bug'>{children}</Link>      
    )
  
//   return null
}

ConditionalRendering.propTypes={
    path:PropTypes.string,
    open:PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    children:PropTypes.any
  }