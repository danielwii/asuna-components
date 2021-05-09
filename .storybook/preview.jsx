import React from 'react';

export const decorators = [
  (Story) => (
    <div style={{ margin: '.5rem' }}>
      <Story />
    </div>
  ),
];
