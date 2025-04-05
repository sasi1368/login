// /src/components/MyComponent.js
import React, { useRef, useEffect } from 'react';

const MyComponent = () => {
  const myRef = useRef(null);

  useEffect(() => {
    if (myRef.current) {
      console.log('The element is present:', myRef.current);
      myRef.current.focus();
    } else {
      console.log('Element is not available yet');
    }
  }, []);

  return (
    <div>
      <input ref={myRef} type="text" placeholder="Focus me after render" />
    </div>
  );
};

export default MyComponent;
