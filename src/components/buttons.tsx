import { Button, Modal, Popconfirm, Tooltip } from 'antd';
import { ButtonProps } from 'antd/es/button';
import { PopconfirmProps } from 'antd/es/popconfirm';
import { TooltipProps } from 'antd/es/tooltip';
import { Promise } from 'bluebird';
import React, { useState } from 'react';

type WordingType = 'Submit' | 'Submitting' | 'Submitted';

export type DefaultButton = ButtonProps & {
  confirmProps?: PopconfirmProps;
  tooltipProps?: TooltipProps;
  disableAfterSubmitted?: boolean;
  handleOk?: () => void;
};
export type NormalButton = { onClick: () => Promise };
export type ModalButton = { builder: ({ onOk, cancel }) => React.ReactNode };
export type AdvancedButton<T> = DefaultButton & T;

function isModalButton(props: any): props is AdvancedButton<ModalButton> {
  return !!props.builder;
}

export const AdvancedButton: React.FC<AdvancedButton<NormalButton | ModalButton>> = (props) => {
  const {
    children,
    onClick,
    handleOk,
    builder,
    disableAfterSubmitted,
    confirmProps,
    tooltipProps,
    ...buttonProps
  } = props;

  if (isModalButton(props)) {
    // props.builder;
  }

  const [loading, setLoading] = useState<boolean>(false);
  const [wording, setWording] = useState<WordingType>('Submit');

  const [visible, setVisible] = useState(false);

  const _show = () => setVisible(true);
  const _handleCancel = () => setVisible(false);

  function handleConfirm(e?: React.MouseEvent<HTMLElement>) {
    setLoading(true);
    setWording('Submitting');
    onClick().then(() => {
      setLoading(false);
      setWording('Submitted');
    });
  }

  const view = (
    <Button
      {...buttonProps}
      loading={loading}
      onClick={(e) => !confirmProps && (onClick ? handleConfirm(e) : _show())}
      disabled={disableAfterSubmitted && wording === 'Submitted'}
    >
      {children ?? wording}
    </Button>
  );

  const modal = builder ? (
    <Modal
      title="Basic Modal"
      visible={visible}
      onCancel={_handleCancel}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
    >
      {builder({ onOk: handleOk, cancel: _handleCancel })}
    </Modal>
  ) : null;

  const withTooltipView = tooltipProps ? <Tooltip {...tooltipProps}>{view}</Tooltip> : view;

  return confirmProps ? (
    <>
      <Popconfirm {...confirmProps} onConfirm={(e) => (onClick ? handleConfirm(e) : _show())}>
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
