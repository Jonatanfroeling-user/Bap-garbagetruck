import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const Test = forwardRef((props, ref) => {
  const [data, setData] = useState(0);

  useImperativeHandle(ref, () => ({
    updateData(val) {
      setData(val)
    }
  }))

  return (
    <div>
      <h2>{data}</h2>
    </div>
  );
});

export default Test;
