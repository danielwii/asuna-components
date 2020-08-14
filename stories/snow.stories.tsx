import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Snow } from '../src';

storiesOf('Snow', module).add('snowing', () => <Snow color={'purple'} />);
