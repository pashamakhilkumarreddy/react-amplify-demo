import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';

const initialState = {
  title: '',
  artist: '',
  description: '',
};

const AddSong = ({ onUpload, setShowAddSong }) => {
  const [songData, setSongData] = useState(initialState);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    try {
      fileRef.current = e.target;
      setFileName(
        fileRef.current.files[0].name ? fileRef.current.files[0].name : ''
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnChange = (e) => {
    try {
      const { name, value } = e.target;
      setSongData({
        ...songData,
        [name]: value,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnClick = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (isValidSongData()) {
        const { title, artist, description } = songData;
        const { key } = await Storage.put(
          `${fileName}_${uuidv4()}.mp3`,
          fileRef.current.files[0],
          {
            contentType: 'audio/mp3',
          }
        );
        const newSongData = {
          id: uuidv4(),
          title,
          description,
          owner: artist,
          filePath: key,
          like: 0,
        };
        await onUpload(newSongData);
        resetForm();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidSongData = () => {
    const isValid =
      Object.values(songData).every((val) => val) &&
      fileName &&
      fileRef.current;
    return isValid;
  };

  const resetForm = () => {
    setSongData(initialState);
    setFileName('');
    fileRef.current = null;
  };

  const { title, artist, description } = songData;

  return (
    <form className='form box'>
      <h2 className='title is-3'>Add a new Song</h2>
      <div className='field'>
        <label className='label'>Title</label>
        <div className='control'>
          <input
            type='text'
            className='input'
            name='title'
            placeholder='Please enter a title'
            value={title}
            required
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Artist</label>
        <div className='control'>
          <input
            type='text'
            className='input'
            name='artist'
            placeholder='Please enter a artist'
            value={artist}
            required
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Description</label>
        <div className='control'>
          <input
            type='text'
            className='input'
            name='description'
            placeholder='Please enter a description'
            value={description}
            required
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div className='field'>
        <div className='control'>
          <div className='field has-name is-fullwidth'>
            <label className='file-label'>
              <input
                type='file'
                name='file'
                className='file-input'
                accept='audio/mpeg, audio/wav, audio/ogg'
                onChange={handleFileChange}
              />
              <span className='file-cta'>
                <span className='file-icon'>
                  <ion-icon name='cloud-upload'></ion-icon>
                </span>
                <span className='file-label'>Choose a file...</span>
              </span>
              {fileName ? <span className='file-name'>{fileName}</span> : null}
            </label>
          </div>
        </div>
      </div>
      <div className='field is-grouped'>
        <div className='control'>
          <button
            type='button'
            className={clsx('button', 'is-link', isLoading ? 'is-loading' : '')}
            onClick={handleOnClick}>
            <span className='pr-3 pt-1'>
              <ion-icon name='cloud-upload-outline' size='small'></ion-icon>
            </span>
            <span>Add Song</span>
          </button>
        </div>
        <div className='control'>
          <button
            type='button'
            className='button is-danger is-light'
            onClick={resetForm}>
            <span className='pr-3 pt-1'>
              <ion-icon name='refresh-outline' size='small'></ion-icon>
            </span>
            <span>Reset</span>
          </button>
        </div>
      </div>
    </form>
  );
};

AddSong.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default AddSong;
