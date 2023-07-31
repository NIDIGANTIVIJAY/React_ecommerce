import React from 'react'
import { Link } from 'react-router-dom';
import classes from '../cssFile/Footer.module.css';

const Footer = () => {
  return (
    <main className={classes.profile}>
      <p className={classes.headerCont}>Aakash Metal Works Copyright © 2023 || All rights reserved || <Link to="/contact">Contact Us</Link> || <Link to="/about">About Us</Link></p>
    </main>
  );
};

export default Footer;
