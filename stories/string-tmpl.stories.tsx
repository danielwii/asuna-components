import { storiesOf } from '@storybook/react';
import { Divider } from 'antd';

import 'antd/dist/antd.css';
import React from 'react';
import { StateFC, StringTmpl } from '../src';

const StoreProvider: StateFC<{ tmpl: string }> = ({ initialState, children }) => {
  const [state, setState] = React.useState(initialState);

  return <div>{children(state, setState)}</div>;
};

storiesOf('StringTmpl', module).add('default', () => (
  <div style={{ margin: '1rem' }}>
    <StoreProvider
      initialState={{
        tmpl: 'a={{n1}}&b={{n2}}&n3={{n3}}&n4={{n4}}&n5={{n5}}&n6={{n6}}&n7={{n7}}&no-fake={{no-fake}}&error={{error}}',
      }}
    >
      {(state, setState) => (
        <>
          <StringTmpl
            tmpl={state.tmpl}
            fields={[
              { name: 'n1', help: 'i am a help', fake: 'name.findName' },
              { name: 'n2', fake: 'date.recent' },
              { name: 'n3', fake: 'address.city' },
              { name: 'n4', fake: 'commerce.product' },
              { name: 'n5', fake: 'internet.email' },
              { name: 'n6', fake: 'internet.ipv6' },
              { name: 'n7', fake: 'lorem.words' },
              { name: 'no-fake' },
            ]}
            onChange={tmpl => setState({ tmpl })}
          />
          <Divider />
          {JSON.stringify(state)}
        </>
      )}
    </StoreProvider>
  </div>
));
