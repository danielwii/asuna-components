import { storiesOf } from '@storybook/react';
import { Divider } from 'antd';
import React from 'react';

import 'spinkit/spinkit.min.css';
import { Loading, LoadingType } from '../src';

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

storiesOf('Loading', module).add('default', () => (
  <React.Fragment>
    <ul>{loadingItems}</ul>
  </React.Fragment>
));
