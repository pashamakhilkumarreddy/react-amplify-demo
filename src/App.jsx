import { useEffect, useState } from 'react';
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import AWSConfig from './aws-exports';
import { listSongs } from './graphql/queries';
import { updateSong, createSong } from './graphql/mutations';
import Footer from './components/Footer';
import Header from './components/Header';
import Songs from './components/Songs';
import AddSong from './components/AddSong';

Amplify.configure(AWSConfig);

const App = () => {
  const [songs, setSongs] = useState([]);
  const [songPlaying, setSongPlaying] = useState('');
  const [audioURL, setAudioURL] = useState('');
  const [showAddSong, setShowAddSong] = useState(false);

  useEffect(() => {
    fetchSongs();
  }, []);

  const toggleSong = async (idx) => {
    try {
      if (songPlaying === idx) {
        setSongPlaying('');
        return;
      }
      const songFilePath = songs[idx].filePath;
      const fileAccessURL = await Storage.get(songFilePath, {
        expires: 90,
      });
      setSongPlaying(idx);
      setAudioURL(fileAccessURL);
    } catch (err) {
      console.error(err);
      setSongPlaying('');
      setAudioURL('');
    }
  };

  const fetchSongs = async () => {
    try {
      const songsData = await API.graphql(graphqlOperation(listSongs));
      const songList = songsData.data.listSongs.items;
      setSongs(songList);
    } catch (err) {
      console.error(err);
    }
  };

  const addLike = async (idx) => {
    try {
      const song = songs[idx];
      song.like = song.like + 1;
      delete song.createdAt;
      delete song.updatedAt;
      const songData = await API.graphql(
        graphqlOperation(updateSong, {
          input: song,
        })
      );
      const allSongs = [...songs];
      allSongs[idx] = songData.data.updateSong;
      setSongs(allSongs);
    } catch (err) {
      console.error(err);
    }
  };

  const addNewSong = async (songData) => {
    try {
      await API.graphql(
        graphqlOperation(createSong, {
          input: songData,
        })
      );
      // setShowAddSong(false);
      fetchSongs();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Header />
      <main className='container mt-3'>
        <div className='columns is-mobile is-centered is-vcentered'>
          <div className='column is-12-mobile is-6-tablet is-6-desktop is-4-widescreen is-3-fullhd'>
            <AmplifySignOut />
          </div>
        </div>
        {songs.length ? (
          <Songs
            songs={songs}
            addLike={addLike}
            toggleSong={toggleSong}
            songPlaying={songPlaying}
            audioURL={audioURL}
          />
        ) : (
          <div className='columns is-mobile is-centered is-vcentered'>
            <div className='column is-12-mobile is-6-tablet is-6-desktop is-4-widescreen is-3-fullhd'>
              <h2 className='title is-3'>Songs 404!</h2>
            </div>
          </div>
        )}
        <div className='columns is-mobile is-centered is-vcentered'>
          <div className='column is-12-mobile is-6-tablet is-6-desktop is-5-widescreen is-4-fullhd'>
            {showAddSong ? (
              <AddSong onUpload={addNewSong} setShowAddSong={setShowAddSong} />
            ) : (
              <>
                <button
                  type='button'
                  className='button is-primary is-light is-fullwidth'
                  onClick={() => setShowAddSong(!showAddSong)}>
                  <ion-icon name='add'></ion-icon>
                </button>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default withAuthenticator(App);
