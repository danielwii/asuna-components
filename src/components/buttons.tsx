import React, { useState } from 'react';
import { Button, Popconfirm, Tooltip } from 'antd';

export function AdvancedButton(props) {
  const {
    children: { initial, progressive, done },
    type,
    event,
    confirmProps,
    tooltipProps,
  } = props;

  const [loading, setLoading] = useState(false);
  const [children, setChildren] = useState(initial);

  function handleConfirm() {
    setLoading(true);
    setChildren(progressive);
    event.then(() => {
      setLoading(false);
      setChildren(done);
    });
  }

  const button = (
    <Button
      type={type}
      loading={loading}
      onClick={() => {
        !confirmProps && handleConfirm();
      }}
    >
      {children}
    </Button>
  );

  if (confirmProps) {
    const popConfirm = (
      <Popconfirm
        {...confirmProps}
        onConfirm={() => {
          handleConfirm();
        }}
      >
        {tooltipProps ? <Tooltip {...tooltipProps}>{button}</Tooltip> : { button }}
      </Popconfirm>
    );
    return popConfirm;
  } else if (tooltipProps) {
    return <Tooltip {...tooltipProps}>{button}</Tooltip>;
  }
  return button;
}
