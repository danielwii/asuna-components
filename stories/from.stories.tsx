import { storiesOf } from '@storybook/react';
import * as _ from 'lodash';
import * as React from 'react';
import { DefaultFileUploaderAdapterImpl, EasyForm, FormFields } from '../src';
import { StoreProvider } from '../src/helper';

const fieldValues: FormFields = {
  switch: { name: 'switch', defaultValue: true, type: 'boolean' },
  number: {
    name: 'number',
    defaultValue: 0,
    type: 'number',
    validate: (value) => (_.isNumber(value) && value === 0 ? '不为 0 的数字' : null),
  },
  string: { name: 'reason', defaultValue: '', type: 'string' },
  text: { name: 'text', type: 'text' },
  emailTmplData: {
    name: 'emailTmplData',
    type: 'emailTmplData',
    validate: (value) => (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : null),
  },
  colorPicker: { name: 'colorPicker', type: 'color' },
  image: { name: 'image', type: 'image', extra: { adapter: new DefaultFileUploaderAdapterImpl() } },
};

storiesOf('Form', module).add('default', () => (
  <div style={{ margin: '1rem' }}>
    <StoreProvider initialState={{}}>
      {(state, setState) => (
        <>
          <EasyForm
            fields={fieldValues}
            onChange={(values) => {
              setState({ fieldValues: values });
            }}
            onSubmit={(values) => {
              console.log('submitted', values);
            }}
            onClear={() => {
              console.log('cleared');
            }}
          />
          {/* <pre>{util.inspect(state)}</pre> */}
        </>
      )}
    </StoreProvider>
  </div>
));
