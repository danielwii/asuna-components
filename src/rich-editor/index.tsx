import { FormOutlined, Html5Outlined } from '@ant-design/icons';

import { Divider, Radio, Space } from 'antd';
import dynamic from 'next/dynamic';
import { format } from 'prettier';
import parserHtml from 'prettier/parser-html';
import React from 'react';
import { useMount, useToggle } from 'react-use';

import { BraftRichEditor } from './braft';

const CodeMirror: any = dynamic(
  () => {
    import('codemirror/addon/comment/comment');
    import('codemirror/addon/display/autorefresh');
    import('codemirror/addon/edit/matchbrackets');
    // import('codemirror/theme/monokai.css');
    import('codemirror/keymap/sublime');
    import('codemirror/mode/htmlmixed/htmlmixed');
    return import('react-codemirror2').then(({ Controlled }) => Controlled);
  },
  { ssr: false },
);

// const logger = consola.withScope('<RichEditor>');

export * from './braft';

export type RichEditorProps = { value: string; onChange: (value: string) => any; validateFn; upload };
export const RichEditor: React.VFC<RichEditorProps> = ({ value, onChange, validateFn, upload, ...props }) => {
  const [mode, setMode] = useToggle(false);
  let parsed = value;
  try {
    parsed = format(value, { parser: 'html', plugins: [parserHtml] });
  } catch (e) {}

  useMount(() => {
    !mode && setMode(true);
  });

  // useLogger('<RichEditor>', { value, parsed });

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
        {/*
        <Button size="small" type="primary" onClick={() => onChange(value)}>
          更新
        </Button>
*/}
      </Space>
      <div>
        {/*<Alert type="info" showIcon message="修改完毕后需要手动点击更新后再进行提交操作" />*/}
        {mode && (
          <BraftRichEditor value={parsed} onChange={(v) => onChange(v)} upload={upload} validateFn={validateFn} />
        )}
        {!mode && CodeMirror && (
          <CodeMirror
            value={parsed}
            options={{
              theme: 'monokai',
              lineNumbers: true,
              // lineWrapping: true,
              tabSize: 2,
              keyMap: 'sublime',
              mode: 'htmlmixed',
            }}
            onBeforeChange={(editor, data, updateTo) => onChange(updateTo)}
          />
        )}{' '}
        <Divider type="horizontal" style={{ height: '1rem' }} />
      </div>
    </Space>
  );
};

export default RichEditor;
