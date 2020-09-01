import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import React from 'react';
import { DefaultFileUploaderAdapterImpl, StoreProvider, Uploader } from '../src';

storiesOf('Uploader', module).add('default', () => (
  <StoreProvider initialState={''}>
    {(state, setState) => (
      <>
        <Uploader
          adapter={new DefaultFileUploaderAdapterImpl()}
          value={state}
          onChange={(files) => setState(files)}
          multiple
        />
      </>
    )}
  </StoreProvider>
));
