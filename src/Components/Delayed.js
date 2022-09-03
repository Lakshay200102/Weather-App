import React, { useState, useEffect } from 'react';

const Delayed = (props) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return isShown ? props.children : null;
};

export default Delayed;