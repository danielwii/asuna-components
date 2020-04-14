import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import React from 'react';

import { PdfButton } from '../src';

storiesOf('Preview', module).add('default', () => (
  <div style={{ margin: '1rem' }}>
    <PdfButton pdf="1.pdf" name="name.pdf" />
    <hr />
    <PdfButton pdf="2.pdf" />
    <hr />
    <PdfButton pdf="1.pdf" name="name.pdf" title="name.pdf" />
  </div>
));
