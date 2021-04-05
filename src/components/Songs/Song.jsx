import PropTypes from 'prop-types';
import AudioPlayer from '../AudioPlayer';

const Song = ({
  idx,
  id,
  title,
  description,
  owner,
  like,
  createdAt,
  songPlaying,
  addLike,
  toggleSong,
  audioURL,
}) => {
  return (
    <div
      className='column is-12-mobile is-6-tablet is-6-desktop is-6-widescreen is-6-fullhd'
      data-id={id}>
      <div className='card'>
        <div className='card-image'></div>
        <div className='card-content'>
          <div className='media'>
            <div className='media-left'>
              <figure className='image is-4by3' onClick={() => toggleSong(idx)}>
                {idx === songPlaying ? (
                  <ion-icon name='pause'></ion-icon>
                ) : (
                  <ion-icon name='play'></ion-icon>
                )}
              </figure>
            </div>
            <div className='media-content'>
              <p className='title is-3'>{title}</p>
              <p className='subtitle is-5'>@{owner}</p>
            </div>
          </div>
          <div className='content'>
            <span className='icon-text'>
              <span className='icon' onClick={() => addLike(idx)}>
                <ion-icon name='heart'></ion-icon>
              </span>
              <span>&nbsp;{like}</span>
            </span>
            <br />
            <span>{description}</span>
            <br />
            <time dateTime={new Date(createdAt)}>
              {new Date(createdAt).toString()}
            </time>
          </div>
        </div>
        {idx === songPlaying ? (
          <AudioPlayer idx={idx} audioURL={audioURL} toggleSong={toggleSong} />
        ) : null}
      </div>
    </div>
  );
};

Song.propTypes = {
  idx: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  like: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  songPlaying: PropTypes.any.isRequired,
  addLike: PropTypes.func,
  toggleSong: PropTypes.func,
  audioURL: PropTypes.string,
};

export default Song;
