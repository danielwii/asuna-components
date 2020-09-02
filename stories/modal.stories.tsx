import { storiesOf } from '@storybook/react';
import { Col, Divider, Row } from 'antd';
import { PopconfirmProps } from 'antd/es/popconfirm';
import { TooltipProps } from 'antd/es/tooltip';
import * as _ from 'lodash';
import * as React from 'react';
import { AdvancedButtonWithModal, DefaultFileUploaderAdapterImpl, EasyForm, FormFields } from '../src';

const fieldValues: FormFields = {
  switch: { name: 'switch', defaultValue: true, type: 'boolean' },
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

const confirmProps: PopconfirmProps = {
  title: '确认创建吗？',
  okText: 'Yes',
  cancelText: 'No',
};

const tooltipProps: TooltipProps = {
  placement: 'right',
  color: 'pink',
  title: '点击创建一个角色',
};

const formBuilder = ({ onOk, onCancel }) => (
  <div style={{ margin: '1rem' }}>
    <EasyForm
      fields={fieldValues}
      onSubmit={(values) => {
        console.log('submitted', values);
        onOk();
      }}
      onClear={() => {
        console.log('cleared');
        onCancel();
      }}
    />
  </div>
);

storiesOf('modal', module).add('modal-button', () => (
  <div style={{ margin: '1rem' }}>
    <Row>
      <Col flex="300px">Form modal with tooltip and pop-confirm</Col>
      <Col flex="auto">
        <AdvancedButtonWithModal
          type="primary"
          confirmProps={confirmProps}
          tooltipProps={tooltipProps}
          handleOk={() => console.log('ok')}
          builder={formBuilder}
        >
          创建角色
        </AdvancedButtonWithModal>
      </Col>
    </Row>
    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} />
    <Row>
      <Col flex="300px">Form modal with tooltip</Col>
      <Col flex="auto">
        <AdvancedButtonWithModal
          type="primary"
          tooltipProps={tooltipProps}
          handleOk={() => console.log('ok')}
          builder={formBuilder}
        >
          创建角色
        </AdvancedButtonWithModal>
      </Col>
    </Row>
    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} />
    <Row>
      <Col flex="300px">Form modal</Col>
      <Col flex="auto">
        <AdvancedButtonWithModal
          type="primary"
          // tooltipProps={tooltipProps}
          handleOk={() => console.log('ok')}
          builder={formBuilder}
        >
          创建角色
        </AdvancedButtonWithModal>
      </Col>
    </Row>
    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} />
  </div>
));
