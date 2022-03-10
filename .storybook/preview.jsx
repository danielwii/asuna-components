import React from 'react';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'react-quill/dist/quill.snow.css';

export const decorators = [
  (Story) => (
    <div style={{ margin: '.5rem' }}>
      <Story />
    </div>
  ),
];
