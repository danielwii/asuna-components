import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import { Row, Col, Divider } from 'antd';
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
    <Row>
      <Col flex="200px">With tooltip and pop-confirm</Col>
      <Col flex="auto">
        <AdvancedButton
          onClick={() => Promise.delay(2000)}
          type="primary"
          confirmProps={confirmProps}
          tooltipProps={tooltipProps}
          disableAfterSubmitted
        />
      </Col>
    </Row>
    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} />
    <Row>
      <Col flex="200px">With pop-confirm</Col>
      <Col flex="auto">
        <AdvancedButton
          onClick={() => Promise.delay(1000)}
          type="primary"
          confirmProps={confirmProps}
          disableAfterSubmitted
        />
      </Col>
    </Row>
    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} />
    <Row>
      <Col flex="200px">With tooltip</Col>
      <Col flex="auto">
        <AdvancedButton
          onClick={() => Promise.delay(2000)}
          type="primary"
          tooltipProps={tooltipProps}
          disableAfterSubmitted
        />
      </Col>
    </Row>
    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} />
    <Row>
      <Col flex="200px">Plain button</Col>
      <Col flex="auto">
        <AdvancedButton onClick={() => Promise.delay(2000)} type="primary" disableAfterSubmitted />
      </Col>
    </Row>
  </div>
));
