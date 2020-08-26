import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { EasyForm } from '../src';
import * as _ from 'lodash';
import { FormField } from '../src/components/form/interfaces';

const fieldValues = {
  switch: {
    name: 'switch',
    defaultValue: true,
    type: 'boolean',
  },
  number: {
    name: 'number',
    defaultValue: 0,
    type: 'number',
    validate: (value) => (_.isNumber(value) && value === 0 ? '不为 0 的数字' : null),
  } as FormField,
  string: { name: 'reason', defaultValue: '', type: 'string' } as FormField,
  text: { name: 'text', type: 'text' } as FormField,
  emailTmplData: {
    name: 'emailTmplData',
    type: 'emailTmplData',
    validate: (value) => (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : null),
  },
  colorPicker: { name: 'colorPicker', type: 'color' } as FormField,
  image: { name: 'image', type: 'image' } as FormField,
};

storiesOf('Form', module).add('default', () => (
  <EasyForm
    fields={fieldValues}
    onSubmit={(values) => {
      console.log('submitted', values);
    }}
    onClear={() => {
      console.log('cleared');
    }}
  />
));
