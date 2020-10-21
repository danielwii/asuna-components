import { storiesOf } from '@storybook/react';
import { Divider } from 'antd';
import * as React from 'react';
import { AsunaTextArea, StoreProvider } from '../src';

storiesOf('Elements', module).add('TextArea', () => (
  <div style={{ margin: '1rem' }}>
    <StoreProvider initialState={{ v1: '{"a":1}', v2: 'text string' }}>
      {(state, setState) => (
        <>
          <AsunaTextArea value={state.v1} onChange={(value) => setState({ ...state, v1: value })} />
          <Divider />
          <AsunaTextArea value={state.v2} onChange={(value) => setState({ ...state, v2: value })} />
        </>
      )}
    </StoreProvider>
  </div>
));
