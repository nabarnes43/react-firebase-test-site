import logo from './logo.svg';
import './App.css';
import { Auth } from './components/auth';
import {db, auth, storage} from './config/firebase';
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { async } from '@firebase/util';
import {ref, uploadBytes} from 'firebase/storage';

function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, "movies");

  //New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  // Update Ttitle State
  const [updatedTitle, setUpdatedTitle] = useState("");

  // File Upload State
  const [fileUpload, setFileUpload] = useState(null);

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      console.log(filteredData);
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect (() => {
    getMovieList();
  }, []);


  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, { 
        title: newMovieTitle, 
        releaseDate: newReleaseDate, 
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid
      });
      getMovieList();
    } catch (error) {
     console.error(error);
    }
  }

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  const updateMovieTitle = async(id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, {title: updatedTitle});
  }

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, 'projectFiles/' + fileUpload.name);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <Auth/>

    <div>
      <input
        placeholder= 'Movie Title...'
        onChange={(e) => setNewMovieTitle(e.target.value)}
      />
      <input 
        placeholder= 'Release Date...' 
        type={'number'}
        onChange={(e) => setNewReleaseDate(Number(e.target.value))}
      />
      <input 
        type={'checkbox'}
        checked = {isNewMovieOscar}
        onChange={(e) => setIsNewMovieOscar(e.target.checked)}
      />
      <label>Recieved an Oscar</label>
      <button onClick={onSubmitMovie}>Submit Movie</button>
    </div>

    <div>
      {movieList.map((movie) => (
        <div>
          <h1 style={{color: movie.receivedAnOscar ? "green" : "red"}}>{movie.title}</h1>
          <p> Date: {movie.releaseDate}</p>
          <button onClick={() => deleteMovie(movie.id)}> Delete Movie </button>
          <input 
            placeholder='new title...' 
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <button onClick={() => updateMovieTitle(movie.id)}> Update Title</button>
        </div>
      ))}
    </div>

    <div>
      <input 
        type={'file'} 
        onChange={(e) => setFileUpload(e.target.files[0])}
      />
      <button onClick={uploadFile}>Upload File</button>
    </div>

    </div>
  );
}

export default App;
