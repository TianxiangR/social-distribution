import React, { ReactNode } from 'react';
import NavBar, { NarBarItem } from './NavBar';
import './NavBarContentWrapper.css';

export interface NavBarContentWrapperProps {
  selection?: string;
  options: Array<NarBarItem>;
  children?: ReactNode;
}

function NavBarContentWrapper(props: NavBarContentWrapperProps) {
  const {children, selection, options} = props;
  return (
    <>
      <div className='main-container'>
        <div className='navbar-container'>
          <NavBar selection={selection} options={options}/>
        </div>
        <div className='content-body-container'>
          {children}
        </div>
      </div>
    </>
  );
}

export default NavBarContentWrapper;