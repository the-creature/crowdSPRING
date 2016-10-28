import React, { Component, PropTypes } from 'react';

import styles from './Intro.scss';

export default function Intro() {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Welcome to the ACME gallery.</h2>
      <ul className={styles.instructions}>
        <li className={styles.instruction}>Select a user from the menu</li>
        <li className={styles.instruction}>Edit their profile</li>
        <li className={styles.instruction}>Upload some images to their gallery</li>
      </ul>
    </div>
  );
}
