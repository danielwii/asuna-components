import { CloseOutlined, MinusCircleOutlined } from '@ant-design/icons';

import { Button, Divider, Input, Space } from 'antd';
import _ from 'lodash';
import * as React from 'react';
import { useLogger } from 'react-use';

import { parseArray } from '../helper';

export type KVArrayItem = { key: string; value: string };
export interface KVArrayProps {
  items: KVArrayItem[];
  onChange: (items: KVArrayItem[]) => void;
}

export const KVArray: React.FC<KVArrayProps> = ({ items, onChange }) => {
  const parsedItems = parseArray<KVArrayItem>(items, []);
  const func = {
    add: (item?: KVArrayItem) => {
      const updateTo = [...parsedItems, item ?? ({} as any)];
      console.log('<KVArray>', '[add]', item, updateTo);
      onChange(updateTo);
    },
    remove: (index) => onChange(_.remove(parsedItems, (item, i) => i !== index)),
  };

  useLogger('<KVArray>', { items, parsedItems });

  return (
    <>
      {_.map(parsedItems, (item, index) => (
        <React.Fragment key={index}>
          <Space align="baseline">
            <Input
              addonBefore="Key"
              value={item.key}
              onChange={(e) => {
                _.set(parsedItems, `${index}.key`, e.target.value);
                // parsedItems[index] = e.target.value;
                onChange(parsedItems);
              }}
            />
            <Divider dashed type="vertical" style={{ margin: '.1rem' }} />
            <Input
              addonBefore="Value"
              value={item.value}
              onChange={(e) => {
                _.set(parsedItems, `${index}.value`, e.target.value);
                // parsedItems[index] = e.target.value;
                onChange(parsedItems);
              }}
            />
            <MinusCircleOutlined onClick={() => func.remove(index)} />
          </Space>
          <Divider dashed style={{ margin: '.1rem' }} />
        </React.Fragment>
      ))}
      <Button type="primary" onClick={() => func.add()}>
        新增
      </Button>
    </>
  );
};
