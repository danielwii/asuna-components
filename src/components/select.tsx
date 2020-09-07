import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select } from 'antd';
import { SelectProps } from 'antd/es/select';
import _ from 'lodash';
import { DefaultValueType } from 'rc-select/lib/interface/generator';
import React from 'react';

export const AsunaSelect: React.FC<{
  value: string;
  items: { text: string; title?: string; value: string | number; disabled?: boolean }[];
  onChange: SelectProps<DefaultValueType>['onChange'];
  allowCustom?: boolean;
}> = ({ value, items, onChange, allowCustom }) => {
  const [filteredItems, setItems] = React.useState(items);
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
                  <Input style={{ flex: 'auto' }} value={extra} onChange={func.setExtra} allowClear />
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
    >
      {_.map(filteredItems, ({ text, ...item }) => (
        <Select.Option {...item}>{text}</Select.Option>
      ))}
    </Select>
  );
};
