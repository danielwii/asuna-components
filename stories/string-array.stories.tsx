import React from 'react';
import { storiesOf } from '@storybook/react';

import 'antd/dist/antd.css';
import { StringArray } from '../src/components';
import { Divider } from 'antd';
import { StateFC } from '../src/helper';

const StoreProvider: StateFC<{ items: string[] }> = ({ initialState, children }) => {
  const [state, setState] = React.useState(initialState);

  return <div>{children(state, setState)}</div>;
};

storiesOf('StringArray', module)
  .add('input', () => (
    <div style={{ margin: '1rem' }}>
      <StoreProvider initialState={{ items: ['123', '456', '789'] }}>
        {(state, setState) => (
          <>
            <StringArray items={state.items} onChange={items => setState({ items })} />
            <Divider />
            {JSON.stringify(state)}
          </>
        )}
      </StoreProvider>
    </div>
  ))
  .add('tag', () => (
    <div style={{ margin: '1rem' }}>
      <StoreProvider initialState={{ items: ['123', '456', '789'] }}>
        {(state, setState) => (
          <>
            <StringArray mode="tag" items={state.items} onChange={items => setState({ items })} />
            <Divider />
            {JSON.stringify(state)}
          </>
        )}
      </StoreProvider>
    </div>
  ));
