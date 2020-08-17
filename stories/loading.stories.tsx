import { storiesOf } from '@storybook/react';
import { Divider } from 'antd';
import React from 'react';
import { Promise } from 'bluebird';
import { StateFC } from '../src';

import 'spinkit/spinkit.min.css';
import { Loading, LoadingType, LivingLoading } from '../src';
import { set } from 'lodash/fp';

const loadingList: LoadingType[] = [
  'plane',
  'chase',
  'wander',
  'fold',
  'grid',
  'circle-fade',
  'circle',
  'swing',
  'flow',
  'pulse',
  'wave',
  'bounce',
];

const loadingItems = loadingList.map((item, idx) => {
  return (
    <li key={idx}>
      {item}
      <Loading type={item} />
      <Divider />
    </li>
  );
});

const StoreProvider: StateFC<{ heartbeat: any }> = ({ initialState, children }) => {
  const [state, setState] = React.useState(initialState);
  return <div>{children(state, setState)}</div>;
};

storiesOf('Loading', module)
  .add('default', () => (
    <React.Fragment>
      <ul>{loadingItems}</ul>
    </React.Fragment>
  ))
  .add('living-loading', () => (
    <React.Fragment>
      <StoreProvider initialState={{ heartbeat: null }}>
        {(state, setState) => {
          Promise.delay(2000).then(() => {
            setState({ heartbeat: true });
          });
          return <LivingLoading heartbeat={state.heartbeat} />;
        }}
      </StoreProvider>
    </React.Fragment>
  ));
