import { storiesOf } from '@storybook/react';
import { Divider } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import * as util from 'util';
import { StoreProvider } from '../src/helper';
import { Image } from '../src';

storiesOf('Image', module).add('default', () => (
  <div style={{ margin: '1rem' }}>
    <StoreProvider initialState={''}>
      {(state, setState) => (
        <>
          <Image src="https://fakeimg.pl/80x30/282828/eae0d0/?retina=1&text=how are you?&font=noto" />
          <Image src="null" />
        </>
      )}
    </StoreProvider>
  </div>
));
