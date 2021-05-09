import { FormOutlined, Html5Outlined } from '@ant-design/icons';

import CodeMirror from '@uiw/react-codemirror';
import { Radio, Space } from 'antd';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';

import prettier from 'prettier';
import parserHtml from 'prettier/parser-html';
import React, { useState } from 'react';
import { useToggle } from 'react-use';
import { BraftRichEditor } from './braft';

export * from './braft';

export const RichEditor: React.FC<{ value: string; onChange: (value: string) => any }> = ({ value, onChange }) => {
  const [mode, setMode] = useToggle(false);
  const [currentValue, setValue] = useState(prettier.format(value, { parser: 'html', plugins: [parserHtml] }));

  const view =
    typeof window !== 'undefined' ? (
      <>
        <div style={{ display: mode ? 'inherit' : 'none' }}>
          <BraftRichEditor value={value} onChange={onChange} />
        </div>
        <div style={{ display: !mode ? 'inherit' : 'none' }}>
          <CodeMirror
            value={currentValue}
            options={{ theme: 'monokai', tabSize: 2, keyMap: 'sublime', mode: 'html' }}
          />
        </div>
      </>
    ) : null;

  return (
    <Space direction="vertical">
      <Radio.Group size="small" value={mode} onChange={(e) => setMode(e.target.value)}>
        <Radio.Button value={true}>
          Editor <FormOutlined />
        </Radio.Button>
        <Radio.Button value={false}>
          HTML <Html5Outlined />
        </Radio.Button>
      </Radio.Group>
      <div>{view}</div>
    </Space>
  );
};
