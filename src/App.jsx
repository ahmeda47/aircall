import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import axios from 'axios'
import Content from "./Content.jsx";

const App = () => {

  useEffect(() => {
    sendRequest()
    setIsArchived(false)
  }, [])

  const [calls, setCalls] = useState([])
  const [archivedCalls, setArchivedCalls] = useState([])
  const [isArchived, setIsArchived] = useState(false)
  const [archiveText, setArchiveText] = useState('show archive')

  const archived = []
  const allCalls = []

  const sendRequest = () => {
    axios.get('https://aircall-job.herokuapp.com/activities').then((res)=>{
      console.log(res.data)
      res.data.filter((call, index)=>{
        if (call.is_archived) {
          archived.push(call);
        } else {
          allCalls.push(call);
        }
      })
      setArchivedCalls(archived)
      setCalls(allCalls)
    })
  }

  const resetCalls = () => {
    axios.get('https://aircall-job.herokuapp.com/reset').then((res)=>{
      sendRequest()
    })
  }

  const showArchived = () => {
    if (isArchived == true){
      setArchiveText('show archive')
      setIsArchived(false)

    } else {
      setArchiveText('show calls')
      setIsArchived(true)
    }
  }

    return (
      <div className='container'>
        <Header/>
          { isArchived ? <div className='restore-row'>
            <button className='restore-btn' onClick={()=>resetCalls()}>Restore All Calls</button> 
          </div> : null }
        <Content calls= {calls} archivedCalls={archivedCalls} isArchived = {isArchived} sendRequest={sendRequest}/>
        <div className='show-row'>
          <button className='show-btn' onClick={()=>showArchived()}>{archiveText}</button>
        </div>
      </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
