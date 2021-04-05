import { memo } from 'react';
import './footer.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='content has-text-centered'>
        <p className='title is-4'>
          <strong>&copy; React Amplify Demo</strong>
        </p>
      </div>
    </footer>
  );
};

export default memo(Footer);
