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

  // useLogger('<RichEditor>', _.difference(state, value));

  const view =
    typeof window !== 'undefined' ? (
      <>
        <Alert type="info" showIcon message="修改完毕后需要手动点击更新后再进行提交操作" />
        <div style={{ display: mode ? 'inherit' : 'none' }}>
          <BraftRichEditor value={state} onChange={setState} upload={upload} validateFn={validateFn} />
        </div>
        <div style={{ display: !mode ? 'inherit' : 'none' }}>
          <CodeMirror
            value={state}
            options={{ theme: 'monokai', lineNumbers: true, tabSize: 2, keyMap: 'sublime', mode: 'htmlmixed' }}
            onBeforeChange={(editor, data, updateTo) => setState(updateTo)}
          />
          <Divider type="horizontal" style={{ height: '1rem' }} />
        </div>
      </>
    ) : null;

  return (
    <Space direction="vertical">
      <Space direction="horizontal">
        <Radio.Group size="small" value={mode} onChange={(e) => setMode(e.target.value)}>
          <Radio.Button value={true}>
            Editor <FormOutlined />
          </Radio.Button>
          <Radio.Button value={false}>
            HTML <Html5Outlined />
          </Radio.Button>
        </Radio.Group>
        <Button size="small" type="primary" disabled={state === value} onClick={() => onChange(state)}>
          更新
        </Button>
      </Space>
      <div>{view}</div>
    </Space>
  );
};

export default RichEditor;
