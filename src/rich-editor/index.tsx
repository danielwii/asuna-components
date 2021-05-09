import { FormOutlined, Html5Outlined } from '@ant-design/icons';

import { Alert, Button, Divider, Radio, Space } from 'antd';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/mode/htmlmixed/htmlmixed';
// import 'codemirror/theme/monokai.css';
import prettier from 'prettier';
import parserHtml from 'prettier/parser-html';
import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { useMount, useToggle } from 'react-use';

import { BraftRichEditor } from './braft';

export * from './braft';

export type RichEditorProps = { value: string; onChange: (value: string) => any; validateFn; upload };
export const RichEditor = ({ value, onChange, validateFn, upload }: RichEditorProps): JSX.Element => {
  const [mode, setMode] = useToggle(false);
  const [state, setState] = useState(prettier.format(value, { parser: 'html', plugins: [parserHtml] }));

  useMount(() => {
    setMode(true);
  });

  const view =
    typeof window !== 'undefined' ? (
      <>
        <div style={{ display: mode ? 'inherit' : 'none' }}>
          <BraftRichEditor value={value} onChange={onChange} upload={upload} validateFn={validateFn} />
        </div>
        <div style={{ display: !mode ? 'inherit' : 'none' }}>
          <Alert type="info" showIcon message="HTML 模式下必须手动点击更新后才可进行提交操作" />
          <CodeMirror
            value={state}
            options={{ theme: 'monokai', lineNumbers: true, tabSize: 2, keyMap: 'sublime', mode: 'htmlmixed' }}
            onBeforeChange={(editor, data, updateTo) => setState(updateTo)}
          />
          <Divider type="horizontal" style={{ height: '1rem' }} />
          <Button type="dashed" onClick={() => onChange(state)}>
            更新
          </Button>
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

export default RichEditor;
