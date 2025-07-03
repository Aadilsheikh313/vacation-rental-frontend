import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../stylesModule/NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <p>Oops! The page you're looking for does not exist.</p>
      <Link to="/" className={styles.homeLink}>Go back to Home</Link>
    </div>
  );
};

export default NotFound;
