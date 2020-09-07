import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { AsunaSelect, StoreProvider } from '../src';

storiesOf('Select', module).add('default', () => (
  <div style={{ margin: '1rem' }}>
    <StoreProvider>
      {(state, setState) => (
        <AsunaSelect
          items={[{ text: 'text', value: 'value' }]}
          value={state}
          onChange={(value) => setState(value)}
          allowCustom
        />
      )}
    </StoreProvider>
  </div>
));
