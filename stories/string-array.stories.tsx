import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import React from 'react';
import { StringArray, StoreProvider } from '../src';

storiesOf('StringArray', module)
  .add('input', () => (
    <div style={{ margin: '1rem' }}>
      <StoreProvider initialState={{ items: ['123', '456', '789'] }}>
        {(state, setState) => <StringArray items={state.items} onChange={(items) => setState({ items })} />}
      </StoreProvider>
    </div>
  ))
  .add('tag', () => (
    <div style={{ margin: '1rem' }}>
      <StoreProvider initialState={{ items: ['123', '456', '789'] }}>
        {(state, setState) => <StringArray mode="tag" items={state.items} onChange={(items) => setState({ items })} />}
      </StoreProvider>
    </div>
  ));
