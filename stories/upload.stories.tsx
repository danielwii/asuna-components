import { storiesOf } from '@storybook/react';
import { Divider } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import * as util from 'util';
import { StoreProvider } from '../src/helper';
import { DefaultFileUploaderAdapterImpl, StateFC, Uploader } from '../src';

storiesOf('Uploader', module).add('default', () => (
  <div style={{ margin: '1rem' }}>
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
  </div>
));
