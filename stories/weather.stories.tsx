import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Sun, Snow } from '../src';

storiesOf('Weather', module)
  .add('sun', () => <Sun />)
  .add('snowing', () => <Snow color={'purple'} />);
