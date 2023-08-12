import './App.css';
import NavBar from './component/NavBar';
import AlbumsList from './component/AlbumsList';
import ImageList from './component/ImageList';

import { db } from './firebaseInit';
import { useState, useRef, useEffect } from "react";
import { collection, addDoc, getDocs, onSnapshot, updateDoc, doc , arrayUnion } from 'firebase/firestore';


function App(){
  const [albums, setAlbums] =  useState([]);
  // const [visibleAlbum, setVisibleAlbum] = useState(null);

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

  // const updateAlbum = async (updateAlbum)=>{
  //   const albumRef = doc(db, "albums", updateAlbum.id);

  //   // Set the "capital" field of the city 'DC'
  //   await updateDoc(albumRef, updateAlbum);
  // }

  const updateAlbum = async (image, id)=>{
    const albumRef = doc(db, "albums", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(albumRef, {
      imageList: arrayUnion(image)
    });
  }

  return (
    <div className="App">
      <header className="App-header">
       
      </header>
      <NavBar />
      <AlbumsList addAlbum={addAlbum} albums={albums} updateAlbum={updateAlbum} db={db}/>:
      
    </div>
  );
}

export default App;
