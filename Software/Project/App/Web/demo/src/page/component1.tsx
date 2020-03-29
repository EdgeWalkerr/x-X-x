import React, { memo } from 'react';

function Component() {
  return (
    <div>
      <p> component1 </p>
    </div>
  );
}

export default memo(Component);
