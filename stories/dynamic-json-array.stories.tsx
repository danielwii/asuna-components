import { storiesOf } from '@storybook/react';
import { Button, Card, Input } from 'antd';

import 'antd/dist/antd.css';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as util from 'util';
import {
  DebugInfo,
  DynamicJsonArrayTable,
  ObjectArrayHelper,
  StringArrayHelper,
  WithDebugInfo,
} from '../src/components';
import { StateFC, WithVariable } from '../src/helper';

const StoreProvider: StateFC<{}> = ({ initialState, children }) => {
  const [state, setState] = React.useState(initialState);

  return <div>{children(state, setState)}</div>;
};

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
          <>
            <Formik initialValues={state} onSubmit={(values, actions) => setState(values)}>
              {formikBag => (
                <>
                  <Form>
                    <Field name="data">
                      {({ field, form, meta }) => (
                        <DynamicJsonArrayTable
                          adapter={ObjectArrayHelper}
                          value={field.value}
                          preview={item => <pre>{util.inspect(ObjectArrayHelper.keyParser(item))}</pre>}
                          render={({ formik, item, index, fieldOpts }) => (
                            <WithDebugInfo info={{ formik }} debug>
                              <Card>
                                <Input {...fieldOpts('key', index)} addonBefore="key" />
                                <Input {...fieldOpts('color', index)} addonBefore="color" />
                                <WithVariable variable={ObjectArrayHelper.fieldParser(item, index)}>
                                  {current => (
                                    <Input
                                      name={current.name('value')}
                                      value={current.value('value')}
                                      onChange={event => formik.handleChange(event)}
                                      addonBefore="value"
                                    />
                                  )}
                                </WithVariable>
                              </Card>
                            </WithDebugInfo>
                          )}
                          onChange={values => form.setFieldValue(field.name, values)}
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
            <DebugInfo data={state} divider debug type="util" />
          </>
        )}
      </StoreProvider>
    </div>
  ))
  .add('array', () => (
    <div style={{ margin: '1rem' }}>
      <StoreProvider
        initialState={{
          data: ['phrase1', '不合适', 'thing2', 'i am thing2', 'thing7', '点击可以查看详情'],
        }}
      >
        {(state, setState) => (
          <>
            <Formik initialValues={state} onSubmit={(values, actions) => setState(values)}>
              {formikBag => (
                <>
                  <Form>
                    <Field name="data">
                      {({ field, form, meta }) => (
                        <DynamicJsonArrayTable
                          adapter={StringArrayHelper}
                          value={field.value}
                          preview={item => <pre>{util.inspect(StringArrayHelper.keyParser(item))}</pre>}
                          render={({ fieldOpts, index }) => <Input {...fieldOpts('key', index)} addonBefore="text" />}
                          onChange={values => form.setFieldValue(field.name, values)}
                        />
                      )}
                    </Field>
                  </Form>
                  <DebugInfo data={formikBag.values} divider debug type="util" />
                </>
              )}
            </Formik>

            <DebugInfo data={state} divider debug type="util" />
          </>
        )}
      </StoreProvider>
    </div>
  ));
