import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { AsunaTable, StoreProvider } from '../src';

storiesOf('Table', module).add('default', () => (
  <div style={{ margin: '1rem' }}>
    <StoreProvider
      initialState={[
        { name: 'n1', num: 1 },
        { name: 'n2', num: 2 },
      ]}
    >
      {(state, setState) => {
        return (
          <AsunaTable
            columns={[
              { name: 'name', title: 'Name', type: 'text' },
              { name: 'num', type: 'text' },
            ]}
            dataSource={state}
            // renderItem={item => }
            onChange={setState}
          />
        );
      }}
    </StoreProvider>
  </div>
));
