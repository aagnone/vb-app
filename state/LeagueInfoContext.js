import React, {useState, useEffect, createContext} from 'react'
import db from '../firebase'

export const LeagueInfoContext = createContext();

const LeagueInfoProvider = props => {

    const [info, setInfo] = useState([])
  
    useEffect(() => {
      fetchInfo()
    }, [])
  
    const fetchInfo = async () => {
      return db.collection('info').onSnapshot((snapshot)=>{
        const postData = []
        snapshot.forEach((doc) => postData.push({...doc.data(), id: doc.id}));
        setInfo(postData)
      })
    }


  return (
    <LeagueInfoContext.Provider value={info}>
      {props.children}
    </LeagueInfoContext.Provider>
  );
};

export default LeagueInfoProvider