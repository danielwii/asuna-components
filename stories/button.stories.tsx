import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import { Row, Col, Divider } from 'antd';
import { PopconfirmProps } from 'antd/es/popconfirm';
import { TooltipProps } from 'antd/es/tooltip';
import { Promise } from 'bluebird';
import * as React from 'react';
import { AdvancedButton, DefaultFileUploaderAdapterImpl, EasyForm, FormFields } from '../src';
import * as _ from 'lodash';

const buttonConfirmProps: PopconfirmProps = {
  title: '确认提交吗？',
  okText: 'Yes',
  cancelText: 'No',
};

const buttonTooltipProps: TooltipProps = {
  placement: 'right',
  color: 'pink',
  title: 'Click to submit',
};

const fields: FormFields = {
  switch: { name: 'switch', defaultValue: true, type: 'boolean' },
  select: { name: 'Select', type: 'select', extra: { items: [1, 2, 3] }, defaultValue: 1 },
  number: {
    name: 'number',
    defaultValue: 0,
    type: 'number',
    validate: (value) => (_.isNumber(value) && value === 0 ? '不为 0 的数字' : null),
  },
  string: { name: 'reason', defaultValue: '', type: 'string' },
  text: { name: 'text', type: 'text' },
  emailTmplData: { name: 'emailTmplData', type: 'emailTmplData' },
  colorPicker: { name: 'colorPicker', type: 'color' },
  image: { name: 'image', type: 'image', extra: { adapter: new DefaultFileUploaderAdapterImpl() } },
};
const fieldValues = {
  number: 10,
  string: 'hello world',
};

const modalConfirmProps: PopconfirmProps = {
  title: '确认创建吗？',
  okText: 'Yes',
  cancelText: 'No',
};

const modalTooltipProps: TooltipProps = {
  placement: 'right',
  color: 'pink',
  title: '点击创建一个角色',
};

const formBuilder = ({ onOk, cancel }) => (
  <div style={{ margin: '1rem' }}>
    <EasyForm
      fields={fields}
      initialValues={fieldValues}
      onSubmit={(values) => {
        console.log('submitted', values);
        onOk();
      }}
      onClear={() => {
        console.log('cleared');
      }}
      onCancel={() => {
        console.log('cancel');
        cancel();
      }}
    />
  </div>
);

storiesOf('Button', module)
  .add('button', () => (
    <div style={{ margin: '1rem' }}>
      <Row>
        <Col flex="200px">With tooltip and pop-confirm</Col>
        <Col flex="auto">
          <AdvancedButton
            onClick={() => Promise.delay(2000)}
            type="primary"
            confirmProps={buttonConfirmProps}
            tooltipProps={buttonTooltipProps}
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
            confirmProps={buttonConfirmProps}
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
            tooltipProps={buttonTooltipProps}
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
  ))
  .add('modal', () => (
    <div style={{ margin: '1rem' }}>
      <Row>
        <Col flex="300px">Form modal with tooltip and pop-confirm</Col>
        <Col flex="auto">
          <AdvancedButton
            type="primary"
            confirmProps={modalConfirmProps}
            tooltipProps={modalTooltipProps}
            handleOk={() => console.log('ok')}
            builder={formBuilder}
          >
            创建角色
          </AdvancedButton>
        </Col>
      </Row>
      <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} />
      <Row>
        <Col flex="300px">Form modal with tooltip</Col>
        <Col flex="auto">
          <AdvancedButton
            type="primary"
            tooltipProps={modalTooltipProps}
            handleOk={() => console.log('ok')}
            builder={formBuilder}
          >
            创建角色
          </AdvancedButton>
        </Col>
      </Row>
      <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} />
      <Row>
        <Col flex="300px">Form modal</Col>
        <Col flex="auto">
          <AdvancedButton type="primary" handleOk={() => console.log('ok')} builder={formBuilder}>
            创建角色
          </AdvancedButton>
        </Col>
      </Row>
      <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} />
    </div>
  ));
