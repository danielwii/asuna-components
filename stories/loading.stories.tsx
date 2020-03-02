import { storiesOf } from '@storybook/react';
import { Divider } from 'antd';
import React from 'react';

import 'spinkit/spinkit.min.css';
import { Loading } from '../src';

storiesOf('Loading', module).add('default', () => (
  <React.Fragment>
    <ul>
      <li>
        plane
        <Loading type="plane" />
        <Divider />
      </li>
      <li>
        chase
        <Loading type="chase" />
        <Divider />
      </li>
      <li>
        wander
        <Loading type="wander" />
        <Divider />
      </li>
      <li>
        fold
        <Loading type="fold" />
        <Divider />
      </li>
      <li>
        grid
        <Loading type="grid" />
        <Divider />
      </li>
      <li>
        circle-fade
        <Loading type="circle-fade" />
        <Divider />
      </li>
      <li>
        circle
        <Loading type="circle" />
        <Divider />
      </li>
      <li>
        swing
        <Loading type="swing" />
        <Divider />
      </li>
      <li>
        flow
        <Loading type="flow" />
        <Divider />
      </li>
      <li>
        pulse
        <Loading type="pulse" />
        <Divider />
      </li>
      <li>
        wave
        <Loading type="wave" />
        <Divider />
      </li>
      <li>
        bounce
        <Loading type="bounce" />
        <Divider />
      </li>
    </ul>
  </React.Fragment>
));
