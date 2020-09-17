import { storiesOf } from '@storybook/react';
import * as _ from 'lodash';
import * as React from 'react';
import { DefaultFileUploaderAdapterImpl, EasyForm, FormFields, StoreProvider } from '../src';

const fields: FormFields = {
  switch: { name: 'switch', defaultValue: true, type: 'boolean', help: '我是一个帮助信息' },
  select: { name: 'Select', type: 'select', extra: { items: [1, 2, 3] }, defaultValue: 1 },
  number: {
    name: 'number',
    defaultValue: 0,
    type: 'number',
    validate: (value) => (_.isNumber(value) && value === 0 ? '不为 0 的数字' : null),
  },
  string: { name: 'reason', defaultValue: '', type: 'string' },
  stringArray: { name: 'String Array', type: 'stringArray' },
  text: { name: 'text', type: 'text', defaultValue: '' },
  emailTmplData: { name: 'emailTmplData', type: 'emailTmplData' },
  // colorPicker: { name: 'colorPicker', type: 'color' },
  image: { name: 'image', type: 'image', extra: { adapter: new DefaultFileUploaderAdapterImpl() } },
};
const fieldValues = {
  number: 10,
  string: 'hello world',
};

storiesOf('Form', module).add('default', () => (
  <div style={{ margin: '1rem' }}>
    <StoreProvider>
      {(state, setState) => (
        <EasyForm
          fields={fields}
          initialValues={fieldValues}
          onSubmit={(values) => {
            console.log('submitted', values);
            setState({ values });
          }}
          onReset={() => {
            console.log('reset');
          }}
          onClear={() => {
            console.log('clear');
          }}
        />
      )}
    </StoreProvider>
  </div>
));
