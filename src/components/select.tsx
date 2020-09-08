import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/es/select';
import _ from 'lodash';
import * as R from 'ramda';
import React from 'react';

export type SelectItem =
  | (string | number)
  | { text: string; title?: string; value: string | number; disabled?: boolean };
export type SelectItems = SelectItem[];
export type AsunaSelectProps = { items: SelectItems; allowCustom?: boolean } & SelectProps<SelectValue>;

export const AsunaSelect: React.FC<AsunaSelectProps> = ({ value, items, onChange, allowCustom, ...selectProps }) => {
  const [filteredItems, setItems] = React.useState(
    R.ifElse(
      R.pipe(R.head, _.isObject),
      () => items,
      () => _.map(items, (v) => ({ text: v, value: v })),
    )(items),
  );
  const [extra, setExtra] = React.useState();

  const func = {
    addItem: () => setItems([...filteredItems, { text: extra, value: extra }]),
    setExtra: (e) => setExtra(e.target.value),
  };

  return (
    <Select
      defaultValue={value}
      onChange={onChange}
      style={{ width: '100%' }}
      allowClear
      {...(allowCustom
        ? {
            dropdownRender: (menu: React.ReactElement): React.ReactElement => (
              <div>
                {menu}
                <Divider style={{ margin: '4px 0' }} />
                <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                  <Input style={{ flex: 'auto' }} size="small" value={extra} onChange={func.setExtra} allowClear />
                  <a
                    style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                    onClick={func.addItem}
                  >
                    <PlusOutlined /> Add
                  </a>
                </div>
              </div>
            ),
          }
        : {})}
      {...selectProps}
    >
      {_.map(filteredItems, ({ text, ...item }) => (
        <Select.Option key={text} {...item}>
          {text}
        </Select.Option>
      ))}
    </Select>
  );
};
