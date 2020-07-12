import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import { PopconfirmProps } from 'antd/es/popconfirm';
import { TooltipProps } from 'antd/es/tooltip';
import { Promise } from 'bluebird';
import * as React from 'react';
import { AdvancedButton } from '../src';

const confirmProps: PopconfirmProps = {
  title: '确认提交吗？',
  okText: 'Yes',
  cancelText: 'No',
};

const tooltipProps: TooltipProps = {
  placement: 'right',
  color: 'pink',
  title: 'Sweet potatoes',
};

storiesOf('Button', module).add('advanced', () => (
  <div style={{ margin: '1rem' }}>
    <AdvancedButton
      onClick={() => Promise.delay(2000)}
      type="primary"
      confirmProps={confirmProps}
      tooltipProps={tooltipProps}
      disableAfterSubmitted
    />
  </div>
));
