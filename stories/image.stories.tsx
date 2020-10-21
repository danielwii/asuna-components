import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import React from 'react';
import { Image } from '../src';
import { StoreProvider } from '../src/helper';

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
