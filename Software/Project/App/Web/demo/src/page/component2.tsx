import React, { memo } from 'react';

function Component() {
  return (
    <div>
      <p> component2 </p>
    </div>
  );
}

export default memo(Component);