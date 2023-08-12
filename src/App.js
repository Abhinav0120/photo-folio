import './App.css';
import NavBar from './component/NavBar';
import AlbumsList from './component/AlbumsList';
import ImageList from './component/ImageList';

// react toasts
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// react-spinner-material
import Spinner from 'react-spinner-material';


import { db } from './firebaseInit';
import { useState, useRef, useEffect } from "react";
import { collection, addDoc, getDocs, onSnapshot, updateDoc, doc , arrayUnion } from 'firebase/firestore';


function App(){
  const [albums, setAlbums] =  useState([]);
  // const [visibleAlbum, setVisibleAlbum] = useState(null);
  const [loading, setLoading] = useState(true);


  const getData = async () => {
    setLoading(true);

    const unsub = onSnapshot(collection(db,"albums"), (snapShot)=>{
      const albums = snapShot.docs.map((doc)=>{
        return{
          id: doc.id,
          ...doc.data()
        }
      })
      setAlbums(albums);
      setLoading(false); // Data fetching finished, set loading to false
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

    toast.success("Album added successfully.");
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
    toast.success("Image added successfully.");

  }

  return (
    <div className="App">
      <ToastContainer/>
      <header className="App-header">
       
      </header>
      <NavBar />
      {loading?
        <div className="loader-container">
          <Spinner
            radius={120}
            color={"#0077FF"}
            stroke={5}
            visible={true}
          />
        </div>
      :<AlbumsList addAlbum={addAlbum} albums={albums} updateAlbum={updateAlbum} db={db}/>
      }
      
    </div>
  );
}

export default App;
