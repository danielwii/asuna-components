import { storiesOf } from '@storybook/react';
import { Divider } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import * as util from 'util';
import { Uploader } from '../src/components/upload';
import { DefaultFileUploaderAdapterImpl } from '../src/components/upload/utils';
import { StateFC } from '../src/helper';

const StoreProvider: StateFC<string | string[]> = ({ initialState, children }) => {
  const [state, setState] = React.useState(initialState);

  return <div>{children(state, setState)}</div>;
};

storiesOf('Uploader', module).add('upload-single', () => (
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
