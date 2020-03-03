/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button, Col, Divider, Input, Row, Tooltip, Card } from 'antd';
import faker from 'faker';
import _ from 'lodash';
import React, { useState } from 'react';
import { WithVariable } from '../helper';

const MATCH_REGEX = /{{([^{}]+)}}/g;

const Editable: React.FC<{
  text: string;
  type: 'input' | 'textarea';
  placeholder?: string;
  editing?: boolean;
}> = ({ text, type, placeholder, editing, children, ...props }) => {
  // Manage the state whether to show the label or the input box. By default, label will be shown.
  // Exercise: It can be made dynamic by accepting initial state as props outside the component
  const [isEditing, setEditing] = useState(editing);

  // Event handler while pressing any key while editing
  const handleKeyDown = (event, type) => {
    // Handle when key is pressed
    const { key } = event;
    const keys = ['Escape', 'Tab'];
    const enterKey = 'Enter';
    const allKeys = [...keys, enterKey]; // All keys array

    /*
      - For textarea, check only Escape and Tab key and set the state to false
      - For everything else, all three keys will set the state to false
    */
    if ((type === 'textarea' && keys.indexOf(key) > -1) || (type !== 'textarea' && allKeys.indexOf(key) > -1)) {
      setEditing(false);
    }
  };

  /*
  - It will display a label is `isEditing` is false
  - It will display the children (input or textarea) if `isEditing` is true
  - when input `onBlur`, we will set the default non edit mode
  Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
  */
  return (
    <section
      // onBlur={() => setEditing(false)}
      {...props}
    >
      {isEditing ? (
        <div onKeyDown={e => handleKeyDown(e, type)}>
          <div style={{ marginBottom: '.5rem' }}>
            <i>
              press{' '}
              <Button type="danger" size="small" onClick={() => setEditing(false)}>
                ESC
              </Button>{' '}
              to exit editing.
            </i>
          </div>
          {children}
        </div>
      ) : (
        <Tooltip title="click to edit" placement="topLeft">
          <div
            css={css`
              border: 1px dashed #d9d9d9;
              padding: 0.1rem;
            `}
            onClick={() => setEditing(true)}
          >
            {text ? (
              <pre
                css={css`
                  white-space: pre-wrap;
                  .tmpl__field {
                    background-color: whitesmoke;
                    line-height: 1.5rem;
                    border: 1px dashed #d9d9d9;
                    border-radius: 2px;
                    padding: 0.1rem 0.2rem;
                    margin: 0 0.1rem;
                  }
                `}
                dangerouslySetInnerHTML={{
                  __html: text?.replace(MATCH_REGEX, `<span class="tmpl__field" ">$1</span>`),
                }}
              />
            ) : (
              <pre>{placeholder || 'writing tmpl content here...'}</pre>
            )}
          </div>
        </Tooltip>
      )}
    </section>
  );
};

export const StringTmpl: React.FC<{
  tmpl: string;
  fields: { name: string; help?: string; fake?: string }[];
  onChange: (tmpl) => void;
}> = ({ tmpl, fields, onChange }) => {
  let ref;
  let pos;

  const func = {
    insert: ({ name }: { name: string }) => {
      const updateTo = `${tmpl.slice(0, pos)}{{${name}}}${tmpl.slice(pos + 1)}`;
      onChange(updateTo);
      ref.focus();
    },
  };

  return (
    <Row gutter={12}>
      <Col span={12}>
        <Editable text={tmpl} type="textarea">
          <Input.TextArea
            ref={node => (ref = node)}
            autoSize
            autoFocus
            value={tmpl}
            onSelect={event => (pos = event.currentTarget.selectionStart)}
            onChange={e => onChange(e.target.value)}
          />
          <Divider type="horizontal" dashed style={{ margin: '0.5rem 0' }} />
          <div
            css={css`
              button {
                margin: 0.1rem;
              }
            `}
          >
            {fields?.map(field => (
              <WithVariable
                key={field.name}
                variable={
                  <Button type="dashed" size="small" onClick={() => func.insert(field)}>
                    {field.name}
                  </Button>
                }
              >
                {rendered =>
                  field.help ? (
                    <Tooltip
                      title={
                        <div>
                          {field.help}
                          {field.fake && <div>{`[fake=${field.fake}]`}</div>}
                        </div>
                      }
                    >
                      {rendered}
                    </Tooltip>
                  ) : (
                    rendered
                  )
                }
              </WithVariable>
            ))}
          </div>
        </Editable>
      </Col>
      <Col span={12}>
        <pre
          css={css`
            white-space: pre-wrap;
            background-color: ghostwhite;
            .tmpl__field {
              background-color: yellowgreen;
              line-height: 1.5rem;
              border: 1px dashed #d9d9d9;
              border-radius: 2px;
              padding: 0.1rem 0.2rem;
              margin: 0 0.1rem;
              &.warning {
                background-color: goldenrod;
              }
            }
          `}
          dangerouslySetInnerHTML={{
            __html: tmpl?.replace(MATCH_REGEX, substring => {
              const field = _.find(fields, field => `{{${field.name}}}` === substring);
              let rendered = substring;
              try {
                rendered = faker.fake(`{{${field.fake}}}`);
              } catch (e) {}
              return `<span class="tmpl__field ${field ? '' : 'warning'}" ">${rendered}</span>`;
            }),
          }}
        />
      </Col>
    </Row>
  );
};
