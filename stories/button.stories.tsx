import React from 'react';
import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import { AdvancedButton } from '../src';

const children = {
  initial: '点击提交',
  progressive: '提交中',
  done: '已提交',
};

const confirmProps = {
  title: '确认提交吗？',
  okText: 'Yes',
  cancelText: 'No',
};

const tooltipProps = {
  placement: 'right',
  color: 'pink',
  title: 'Sweet potatos',
};

const event = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 4000);
});

const type = 'primary';

storiesOf('Button', module).add('advanced', () => (
  <>
    <AdvancedButton
      children={children}
      event={event}
      type={type}
      confirmProps={confirmProps}
      tooltipProps={tooltipProps}
    />
  </>
));
