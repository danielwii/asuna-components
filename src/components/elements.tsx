import { Input, Tag } from 'antd';
import { TextAreaProps } from 'antd/lib/input/TextArea';
import React from 'react';
import { isJson } from '../helper';

export const AsunaTextArea: React.FC<
  { value: string; onChange: (value: string) => any } & Omit<TextAreaProps, 'onChange'>
> = ({ value, onChange, ...props }) => {
  const isJsonValue = React.useMemo<boolean>(() => isJson(value), [value]);
  return (
    <>
      <Input.TextArea {...props} autoSize rows={4} value={value} onChange={(e) => onChange(e.target.value)} />
      {isJsonValue && <Tag color="success">JSON</Tag>}
    </>
  );
};
