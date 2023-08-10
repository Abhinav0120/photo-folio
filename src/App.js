import './App.css';
import NavBar from './component/NavBar';
import AlbumsList from './component/AlbumsList';

import { db } from './firebaseInit';
import { useState, useRef, useEffect } from "react";
import { collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';


function App(){
  const [albums, setAlbums] =  useState([]);

  const getData = async () => {
    const unsub = onSnapshot(collection(db,"albums"), (snapShot)=>{
      const albums = snapShot.docs.map((doc)=>{
        return{
          id: doc.id,
          ...doc.data()
        }
      })
      setAlbums(albums);
      console.log(albums);
    })

    // const snapshot = await getDocs(collection(db, "albums"));
    // const albums = snapshot.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data()
    // }));
    // setAlbums(albums);
    
    
  };

  useEffect(() => {
    getData();
  }, []);

  const addAlbum = async (album) => {
    const albumsRef = collection(db, "albums");
    const docRef = await addDoc(albumsRef, album);

    const newAlbum = { id: docRef.id, ...album };

    // setAlbums([newAlbum, ...albums]);
    // console.log(albums);
  };

  return (
    <div className="App">
      <header className="App-header">
       
      </header>
      <NavBar />
      <AlbumsList addAlbum={addAlbum} albums={albums}/>
    </div>
  );
}

export default App;
