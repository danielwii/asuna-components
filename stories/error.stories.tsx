import { storiesOf } from '@storybook/react';
import React from 'react';
import { ErrorInfo } from '../src';
import { Divider } from 'antd';

storiesOf('Error', module).add('default', () => (
  <>
    <ErrorInfo />
    <Divider />
    <ErrorInfo title="Error Title" subTitle="Sub title" extra="extra info" children="the content" />
  </>
));
