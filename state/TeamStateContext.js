import React, {useState, useEffect, createContext} from 'react'
import db from '../firebase'

export const TeamStateContext = createContext();

const TeamStateProvider = props => {

  const [posts, setPosts] = useState();

  useEffect(() => {
    return db.collection('teams').orderBy("wins", "desc").onSnapshot((snapshot) => {
      const postData = [];
      snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
      setPosts(postData);
    });
  }, []);

  return (
    <TeamStateContext.Provider value={posts}>
      {props.children}
    </TeamStateContext.Provider>
  );
};

export default TeamStateProvider