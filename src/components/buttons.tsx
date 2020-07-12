import { Button, Popconfirm, Tooltip } from 'antd';
import { ButtonProps } from 'antd/es/button';
import { PopconfirmProps } from 'antd/es/popconfirm';
import { TooltipProps } from 'antd/es/tooltip';
import { Promise } from 'bluebird';
import React, { useState } from 'react';

type WordingType = 'Submit' | 'Submitting' | 'Submitted';

export const AdvancedButton: React.FC<
  ButtonProps & {
    onClick: () => Promise;
    confirmProps?: PopconfirmProps;
    tooltipProps?: TooltipProps;
    disableAfterSubmitted?: boolean;
  }
> = (props) => {
  const { children, onClick, disableAfterSubmitted, confirmProps, tooltipProps, ...buttonProps } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [wording, setWording] = useState<WordingType>('Submit');

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
      onClick={(e) => !confirmProps && handleConfirm(e)}
      disabled={disableAfterSubmitted && wording === 'Submitted'}
    >
      {children ?? wording}
    </Button>
  );

  const withTooltipView = tooltipProps ? <Tooltip {...tooltipProps}>{view}</Tooltip> : view;
  return confirmProps ? (
    <Popconfirm {...confirmProps} onConfirm={(e) => handleConfirm(e)}>
      {withTooltipView}
    </Popconfirm>
  ) : (
    withTooltipView
  );
};
