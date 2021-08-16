import React, {useState, useEffect, createContext} from 'react'
import db from '../firebase'

export const AnnouncementsContext = createContext();

const AnnouncementsProvider = props => {

  const [posts, setPosts] = useState();

  useEffect(() => {
    return db.collection('blog').onSnapshot((snapshot) => {
      const postData = [];
      snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
      setPosts(postData);
    });
  }, []);


  return (
    <AnnouncementsContext.Provider value={posts}>
      {props.children}
    </AnnouncementsContext.Provider>
  );
};

export default AnnouncementsProvider