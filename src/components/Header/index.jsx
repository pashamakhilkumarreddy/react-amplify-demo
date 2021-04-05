import clsx from 'clsx';
import { memo, useState } from 'react';
import './header.scss';

const Header = () => {
  const [display, setDisplay] = useState(false);
  return (
    <header className='header'>
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand'>
          <a href='/' className='navbar-item'>
            <img src='' alt='Logo' loading='lazy' decoding='async' />
          </a>

          <span
            role='button'
            className='navbar-burger'
            aria-label='menu'
            aria-expanded='false'
            data-target='main-navbar'
            onClick={() => setDisplay(!display)}>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </span>
        </div>
        <div
          className={clsx('navbar-menu', display ? 'is-block' : '')}
          id='main-navbar'>
          <div className='navbar-start'>
            <a href='/' className='navbar-item'>
              Home
            </a>
          </div>
          <div className='navbar-end'></div>
        </div>
      </nav>
    </header>
  );
};

export default memo(Header);
