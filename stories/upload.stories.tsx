import { storiesOf } from '@storybook/react';
import { Divider } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import * as util from 'util';

import { DefaultFileUploaderAdapterImpl, StateFC, Uploader } from '../src';

const StoreProvider: StateFC<string | string[]> = ({ initialState, children }) => {
  const [state, setState] = React.useState(initialState);

  return <div>{children(state, setState)}</div>;
};

storiesOf('Uploader', module).add('default', () => (
  <div style={{ margin: '1rem' }}>
    <StoreProvider initialState={''}>
      {(state, setState) => (
        <>
          <Uploader
            adapter={new DefaultFileUploaderAdapterImpl()}
            value={state}
            onChange={files => setState(files)}
            multiple
          />
          <Divider />
          <pre>{util.inspect(state)}</pre>
        </>
      )}
    </StoreProvider>
  </div>
));
