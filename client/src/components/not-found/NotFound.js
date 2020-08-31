import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='container text-center' style={{ height: '80vh' }}>
      <h1 className='display-4'>Page Not Found</h1>
      <p>Sorry, this page does not exist</p>
      <Link to='/' className='btn btn-primary btn-lg'>
        Go To The Main Page
      </Link>
    </div>
  );
};

export default NotFound;
