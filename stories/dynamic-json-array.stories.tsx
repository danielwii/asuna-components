import { storiesOf } from '@storybook/react';
import { Card, Input } from 'antd';

import 'antd/dist/antd.css';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as util from 'util';
import { DebugInfo, DynamicJsonArrayTable, IndexArrayHelper, WithDebugInfo } from '../src/components';
import { StateFC, WithVariable } from '../src/helper';

const StoreProvider: StateFC<{}> = ({ initialState, children }) => {
  const [state, setState] = React.useState(initialState);

  return <div>{children(state, setState)}</div>;
};

storiesOf('DynamicJsonArray', module).add('default', () => (
  <div style={{ margin: '1rem' }}>
    <StoreProvider
      initialState={{
        text: {
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
                  <Field name="text">
                    {({ field, form, meta }) => (
                      <DynamicJsonArrayTable
                        createItem={IndexArrayHelper.createItem}
                        fieldOptsParser={IndexArrayHelper.fieldParser}
                        value={field.value}
                        preview={item => <pre>{util.inspect(IndexArrayHelper.keyParser(item))}</pre>}
                        render={({ formik, item, index, fieldOpts }) => (
                          <WithDebugInfo info={{ formik }} debug>
                            <Card>
                              <Input {...fieldOpts('key', index)} addonBefore="key" />
                              <Input {...fieldOpts('color', index)} addonBefore="color" />
                              <WithVariable variable={IndexArrayHelper.fieldParser(item, index)}>
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
              </>
            )}
          </Formik>
          <DebugInfo data={state} divider debug type="util" />
        </>
      )}
    </StoreProvider>
  </div>
));
// .add('array', () => (
//   <div style={{ margin: '1rem' }}>
//     <StoreProvider
//       initialState={{
//         text: ['phrase1', '不合适', 'thing2', 'i am thing2', 'thing7', '点击可以查看详情'],
//       }}
//     >
//       {(state, setState) => (
//         <>
//           <Formik initialValues={state} onSubmit={(values, actions) => setState(values)}>
//             {formikBag => (
//               <>
//                 <Form>
//                   <Field name="text">
//                     {({ field, form, meta }) => (
//                       <DynamicJsonArrayTable
//                         value={field.value}
//                         // createItem={index => ({ [`${index}-key`]: '' })}
//                         preview={item => <pre>{util.inspect(item)}</pre>}
//                         render={(formik, item, index) => (
//                           <Input
//                             name={`${index}-key`}
//                             value={item?.[`${index}-key`]}
//                             onChange={event => formik.handleChange(event)}
//                             addonBefore="key"
//                           />
//                         )}
//                         onChange={values => form.setFieldValue(field.name, values)}
//                       />
//                     )}
//                   </Field>
//                 </Form>
//                 <DebugInfo data={formikBag} divider debug type="util" />
//               </>
//             )}
//           </Formik>
//
//           <DebugInfo data={state} divider debug type="util" />
//         </>
//       )}
//     </StoreProvider>
//   </div>
// ))
