import { storiesOf } from '@storybook/react';
import { Button, Card, Input } from 'antd';
import 'antd/dist/antd.css';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as util from 'util';
import {
  DebugInfo,
  DynamicJsonArrayTable,
  ObjectArrayJsonTableHelper,
  ObjectJsonTableHelper,
  StringArrayJsonTableHelper,
  WithDebugInfo,
  WithVariable,
} from '../src';
import { StoreProvider } from '../src/helper';

storiesOf('DynamicJsonArray', module)
  .add('object', () => (
    <div style={{ margin: '1rem' }}>
      <StoreProvider
        initialState={{
          data: {
            '0-key': 'phrase1',
            '0-value': '不合适',
            '1-key': 'thing2',
            '1-value': 'i am the thing2',
            '2-key': 'thing7',
            '2-value': '点击可以查看详情',
          },
        }}
      >
        {(state, setState) => (
          <Formik initialValues={state} onSubmit={(values, actions) => setState(values)}>
            {(formikBag) => (
              <>
                <Form>
                  <Field name="data">
                    {({ field, form, meta }) => (
                      <DynamicJsonArrayTable
                        adapter={ObjectJsonTableHelper}
                        value={field.value}
                        preview={(item) => <div>{util.inspect(ObjectJsonTableHelper.keyParser(item))}</div>}
                        render={({ formik, item, index, fieldOpts }) => (
                          <WithDebugInfo info={{ formik }} debug>
                            <Card>
                              <Input {...fieldOpts('key', index)} addonBefore="key" />
                              <Input {...fieldOpts('color', index)} addonBefore="color" />
                              <WithVariable variable={ObjectJsonTableHelper.fieldParser(item, index)}>
                                {(current) => (
                                  <Input
                                    name={current.name('value')}
                                    value={current.value('value')}
                                    onChange={(event) => formik.handleChange(event)}
                                    addonBefore="value"
                                  />
                                )}
                              </WithVariable>
                            </Card>
                          </WithDebugInfo>
                        )}
                        onChange={(values) => form.setFieldValue(field.name, values)}
                      />
                    )}
                  </Field>
                </Form>
                <DebugInfo data={formikBag.values} divider debug type="util" />
                <Button htmlType="submit" onClick={() => formikBag.handleSubmit()}>
                  Submit
                </Button>
              </>
            )}
          </Formik>
        )}
      </StoreProvider>
    </div>
  ))
  .add('array-string', () => (
    <div style={{ margin: '1rem' }}>
      <StoreProvider
        initialState={{
          data: ['phrase1', '不合适', 'thing2', 'i am thing2', 'thing7', '点击可以查看详情'],
        }}
      >
        {(state, setState) => (
          <Formik initialValues={state} onSubmit={(values, actions) => setState(values)}>
            {(formikBag) => (
              <>
                <Form>
                  <Field name="data">
                    {({ field, form, meta }) => (
                      <DynamicJsonArrayTable
                        adapter={StringArrayJsonTableHelper}
                        value={field.value}
                        preview={(item) => <div>{util.inspect(StringArrayJsonTableHelper.keyParser(item))}</div>}
                        render={({ fieldOpts, index }) => <Input {...fieldOpts('key', index)} addonBefore="text" />}
                        onChange={(values) => form.setFieldValue(field.name, values)}
                      />
                    )}
                  </Field>
                </Form>
                <DebugInfo data={formikBag.values} divider debug type="util" />
                <Button htmlType="submit" onClick={() => formikBag.handleSubmit()}>
                  Submit
                </Button>
              </>
            )}
          </Formik>
        )}
      </StoreProvider>
    </div>
  ))
  .add('array-object', () => (
    <div style={{ margin: '1rem' }}>
      <StoreProvider
        initialState={{
          data: [
            { path: 'ping', text: 'pong' },
            { path: 'hello', text: 'world' },
          ],
        }}
      >
        {(state, setState) => (
          <Formik initialValues={state} onSubmit={(values, actions) => setState(values)}>
            {(formikBag) => (
              <>
                <Form>
                  <Field name="data">
                    {({ field, form, meta }) => (
                      <WithVariable variable={ObjectArrayJsonTableHelper}>
                        {(helper) => (
                          <DynamicJsonArrayTable
                            adapter={helper}
                            value={field.value}
                            preview={(item) => <div>{util.inspect(helper.keyParser(item))}</div>}
                            render={({ fieldOpts, index }) => (
                              <>
                                <Input {...fieldOpts('path', index)} addonBefore="path" />
                                <Input.TextArea {...fieldOpts('text', index)} placeholder="text" autoSize />
                              </>
                            )}
                            onChange={(values) => form.setFieldValue(field.name, values)}
                          />
                        )}
                      </WithVariable>
                    )}
                  </Field>
                </Form>
                <DebugInfo data={formikBag.values} divider debug type="util" />
                <Button htmlType="submit" onClick={() => formikBag.handleSubmit()}>
                  Submit
                </Button>
              </>
            )}
          </Formik>
        )}
      </StoreProvider>
    </div>
  ));
