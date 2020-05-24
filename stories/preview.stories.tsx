import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import React from 'react';

import { PdfButton, Preview } from '../src';

storiesOf('Preview', module).add('default', () => (
  <div style={{ margin: '1rem' }}>
    <PdfButton pdf="1.pdf" name="name.pdf" />
    <hr />
    <PdfButton pdf="2.pdf" />
    <hr />
    <PdfButton pdf="1.pdf" name="name.pdf" title="name.pdf" />
    <hr />
    <Preview text={JSON.stringify({ a: 1, b: new Date(), c: '123' })} jsonMode />
    <hr />
    <Preview text={JSON.stringify({ a: 1, b: new Date(), c: '234' })} listMode />
  </div>
));
