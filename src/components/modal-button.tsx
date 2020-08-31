import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { Popconfirm, Tooltip } from 'antd';
import { ButtonProps } from 'antd/es/button';
import { PopconfirmProps } from 'antd/es/popconfirm';
import { TooltipProps } from 'antd/es/tooltip';

export const AdvancedButtonWithModal: React.FC<
  ButtonProps & {
    confirmProps?: PopconfirmProps;
    tooltipProps?: TooltipProps;
    disableAfterSubmitted?: boolean;
    handleOk?: () => void;
    builder?: () => React.ReactNode;
  }
> = (props) => {
  const { children, disableAfterSubmitted, handleOk, builder, confirmProps, tooltipProps, ...buttonProps } = props;
  const [visible, setVisible] = useState(false);

  const _show = () => setVisible(true);
  const _handleCancel = () => setVisible(false);
  const view = (
    <Button {...buttonProps} onClick={(e) => !confirmProps && _show()}>
      {children ?? '创建'}
    </Button>
  );

  const modal = (
    <Modal title="Basic Modal" visible={visible} onOk={handleOk} onCancel={_handleCancel}>
      {builder()}
    </Modal>
  );

  const withTooltipView = tooltipProps ? <Tooltip {...tooltipProps}>{view}</Tooltip> : view;

  return confirmProps ? (
    <>
      <Popconfirm {...confirmProps} onConfirm={(e) => _show()}>
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
