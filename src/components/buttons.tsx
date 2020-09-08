import { Button, Modal, Popconfirm, Tooltip } from 'antd';
import { ButtonProps } from 'antd/es/button';
import { PopconfirmProps } from 'antd/es/popconfirm';
import { TooltipProps } from 'antd/es/tooltip';
import { Promise } from 'bluebird';
import React, { useState } from 'react';

type WordingType = 'Submit' | 'Submitting' | 'Submitted';

export type DefaultButton = Omit<ButtonProps, 'onClick'> & {
  confirmProps?: PopconfirmProps;
  tooltipProps?: TooltipProps;
  disableAfterSubmitted?: boolean;
  handleOk?: () => void;
};
export interface NormalButton {
  onClick: () => Promise<any>;
}
export interface ModalButton {
  builder: ({ onOk, cancel }) => React.ReactNode;
}
export type AdvancedButton<T> = DefaultButton & T;

function isNormalButton(props: any): props is AdvancedButton<NormalButton> {
  return !!props.onClick;
}

function isModalButton(props: any): props is AdvancedButton<ModalButton> {
  return !!props.builder;
}

export const AdvancedButton: React.FC<AdvancedButton<NormalButton | ModalButton>> = (props) => {
  const { children, handleOk, disableAfterSubmitted, confirmProps, tooltipProps, ...buttonProps } = props;

  const [loading, setLoading] = useState(false);
  const [wording, setWording] = useState<WordingType>('Submit');

  const [visible, setVisible] = useState(false);

  const _show = () => setVisible(true);
  const _handleCancel = () => setVisible(false);

  function handleConfirm(e?: React.MouseEvent<HTMLElement>) {
    setLoading(true);
    setWording('Submitting');
    (props as NormalButton).onClick().then(() => {
      setLoading(false);
      setWording('Submitted');
    });
  }

  const view = (
    <Button
      {...buttonProps}
      loading={loading}
      onClick={(e) => !confirmProps && (isNormalButton(props) ? handleConfirm(e) : _show())}
      disabled={disableAfterSubmitted && wording === 'Submitted'}
    >
      {children ?? wording}
    </Button>
  );

  const modal = isModalButton(props) ? (
    <Modal
      title="Basic Modal"
      visible={visible}
      onCancel={_handleCancel}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
    >
      {props.builder({ onOk: handleOk, cancel: _handleCancel })}
    </Modal>
  ) : null;

  const withTooltipView = tooltipProps ? <Tooltip {...tooltipProps}>{view}</Tooltip> : view;

  return confirmProps ? (
    <>
      <Popconfirm {...confirmProps} onConfirm={(e) => (isNormalButton(props) ? handleConfirm(e) : _show())}>
        {withTooltipView}
      </Popconfirm>
      {modal}
    </>
  ) : (
    <>
      {withTooltipView}
      {modal}
    </>
  );
};
