import React, { useState, useEffect } from "react";
import axios from 'axios'

const Content = (props) => {

  const handleArchive = (id) =>{
    axios.post(`https://aircall-job.herokuapp.com/activities/${id}`, {is_archived:true}).then((res)=>{
      props.sendRequest()
    })
  }

  const handleUnarchive = (id) =>{
    console.log(id)
    axios.post(`https://aircall-job.herokuapp.com/activities/${id}`, {is_archived:false}).then((res)=>{
      props.sendRequest()

    })
  }

  const formatTime = (time) => {
    const newTime = time.toString().split('T')[1].slice(0,5)
    return newTime

  }

  const mapArray = props.isArchived ?   props.archivedCalls.map((call, i)=>{
    return (
      <div className='content-container'>
        <div className ="date">{props.archivedCalls[i].created_at.toString().split('T')[0]}</div>
        <div className='call-container' index = {i}>
          <div><b>{props.archivedCalls[i].to}</b></div>
          <div className="call-row">
            <div>{props.archivedCalls[i].from}</div>
            <div className="time">{formatTime(props.archivedCalls[i].created_at)}</div>
          </div>          
          <button className = 'archive-btn' onClick={()=>{handleUnarchive(call.id)}}>Restore</button>
        </div> 
      </div>
  );
  }) :
  
  props.calls.map((call, i)=>{
    return (
      <div className='content-container'>
        <div className ="date">{props.calls[i].created_at.toString().split('T')[0]}</div>
        <div className='call-container' index = {i}>
          <div><b>{props.calls[i].to}</b></div>
          <div className="call-row">
            <div>{props.calls[i].from}</div>
            <div className="time">{formatTime(props.calls[i].created_at)}</div>
          </div>
          <button className = 'archive-btn' onClick={()=>{handleArchive(call.id)}}>Archive</button>
        </div>
      </div>
    );
  })

  
return mapArray


};

export default Content;