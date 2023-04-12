// react
import React, { useState, useEffect } from 'react';
// router
import { NavLink } from 'react-router-dom';
// styles
import styles from './index.module.scss';

// react component
const LinkCustom = React.memo(({ path, text }) => {
  // state
  const [pathname, setPathname] = useState('');

  // useEffect
  useEffect(() => {
    setPathname(path);
  }, []);
  return (
    <div className={styles['container']}>
      <NavLink to={pathname}>{text}</NavLink>
    </div>
  );
});

export { LinkCustom };
