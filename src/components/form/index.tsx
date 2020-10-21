/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button, Card, Divider, Input, Space, Switch } from 'antd';
import { Promise } from 'bluebird';
import { changeAntdTheme, generateThemeColor } from 'dynamic-antd-theme';
import { Field, FieldInputProps, FieldProps, Form, FormikErrors, FormikProps, FormikValues, withFormik } from 'formik';
import * as _ from 'lodash';
import * as React from 'react';
import { SketchPicker } from 'react-color';
import * as util from 'util';
import {
  AsunaSelect,
  DebugInfo,
  DynamicJsonArrayTable,
  ObjectJsonTableHelper,
  StringArray,
  StringTmpl,
  Uploader,
} from '..';
import { isPromiseAlike, WithVariable } from '../../helper';
import { DefaultFileUploaderAdapterImpl } from '../upload';
import { FormField, FormFieldDef, FormFields, FormFieldType } from './interfaces';

export * from './interfaces';

interface FormProps<FieldsType> {
  message?: string | React.ReactChild;
  body?: string | React.ReactChild;
  fields: FieldsType;
}

interface EasyFormProps extends FormProps<FormFields> {
  initialValues: Record<string, unknown>;
  onSubmit: (values: Record<string, unknown>) => Promise<unknown> | unknown;
  onReset?: () => Promise<unknown> | unknown;
  onCancel?: () => Promise<unknown> | unknown;
  onClear?: () => Promise<unknown> | unknown;
}

export function RenderInputComponent<Values, InputValue>({
  form,
  fieldDef,
  field,
  value,
}: {
  form: FormikProps<Values>;
  fieldDef: FormFieldDef;
  field: FieldInputProps<InputValue>;
  value: any;
}) {
  // useLogger('RenderInputComponent', { fieldDef, field, value });

  switch (fieldDef.field.type) {
    case FormFieldType.boolean: {
      return (
        <React.Fragment>
          <label>{fieldDef.name}</label>
          <Switch
            onChange={(checked: boolean, event: MouseEvent) =>
              field.onChange({ target: { id: field.name, name: field.name, value: checked } })
            }
            defaultChecked={value}
          />
        </React.Fragment>
      );
    }
    case FormFieldType.color: {
      return (
        <React.Fragment>
          <label>{field.name}</label>
          <SketchPicker
            css={css`
              margin: 1rem;
            `}
            color={value}
            onChange={(color) => {
              changeAntdTheme(generateThemeColor(color.hex));
              field.onChange({ target: { id: field.name, name: field.name, value: color } });
            }}
          />
        </React.Fragment>
      );
    }
    case FormFieldType.image: {
      return (
        <React.Fragment>
          <label>{field.name}</label>
          <Uploader
            {...{ adapter: new DefaultFileUploaderAdapterImpl(), ...fieldDef.field.extra }}
            // adapter={fieldDef.field.extra?.adapter ?? new DefaultFileUploaderAdapterImpl()}
            value={value}
            onChange={(newValue) => {
              field.onChange({ target: { id: field.name, name: field.name, value: newValue } });
            }}
          />
        </React.Fragment>
      );
    }
    case FormFieldType.string: {
      const label = field.name === fieldDef.name ? field.name : `${field.name} / ${fieldDef.name}`;
      return (
        <React.Fragment>
          <label>{label}</label>
          <Input id={field.name} {...field} value={value} />
          {/* <Input id={field.name} multiline {...field} value={value} /> */}
        </React.Fragment>
      );
    }
    case FormFieldType.json:
    case FormFieldType.text: {
      const label = field.name === fieldDef.name ? field.name : `${field.name} / ${fieldDef.name}`;
      return (
        <React.Fragment>
          <label>{label}</label>
          <Input.TextArea id={field.name} {...field} autoSize rows={4} value={value} />
          {/* <Input id={field.name} multiline {...field} value={value} /> */}
        </React.Fragment>
      );
    }
    case 'select': {
      const label = field.name === fieldDef.name ? field.name : `${field.name} / ${fieldDef.name}`;
      const name = field.name;
      return (
        <React.Fragment>
          <label>{label}</label>
          <AsunaSelect
            style={{ width: 240 }}
            placeholder={label}
            {...field}
            onChange={(value) => field.onChange({ target: { id: name, name, value } })}
            value={value}
            {...fieldDef.field.extra}
          />
        </React.Fragment>
      );
    }
    case 'stringArray': {
      const label = field.name === fieldDef.name ? field.name : `${field.name} / ${fieldDef.name}`;
      const name = field.name;
      return (
        <React.Fragment>
          <label>{label}</label>
          <StringArray onChange={(value) => field.onChange({ target: { id: name, name, value } })} items={value} />
        </React.Fragment>
      );
    }
    case FormFieldType.stringTmpl: {
      const label = field.name === fieldDef.name ? field.name : `${field.name} / ${fieldDef.name}`;
      return (
        <React.Fragment>
          <label>{label}</label>
          <StringTmpl tmpl={value} {...field} fields={[]} {...fieldDef.field.extra} />
        </React.Fragment>
      );
    }
    case FormFieldType.emailTmplData: {
      const label = field.name === fieldDef.name ? field.name : `${field.name} / ${fieldDef.name}`;
      return (
        <React.Fragment>
          <label>{label}</label>
          <DynamicJsonArrayTable
            adapter={ObjectJsonTableHelper}
            value={value}
            preview={(item) => <div>{util.inspect(ObjectJsonTableHelper.keyParser(item))}</div>}
            render={({ fieldOpts, index }) => (
              <Card>
                <Input {...fieldOpts('key', index)} placeholder="key" />
                <Input {...fieldOpts('subject', index)} placeholder="subject" />
                {/* <TextField {...fieldOpts('template', index)} label="template" /> */}
                <WithVariable variable={fieldOpts('template', index)}>
                  {({ name, value, onChange }) => (
                    <StringTmpl
                      tmpl={value}
                      fields={[]}
                      onChange={(value) => onChange({ target: { id: name, name, value } } as any)}
                      htmlMode
                    />
                  )}
                </WithVariable>
                <pre>{JSON.stringify(field, null, 2)}</pre>
              </Card>
            )}
            onChange={(values) => form.setFieldValue(field.name, values)}
          />
          {/* <DebugInfo data={value} type="util" /> */}
        </React.Fragment>
      );
    }
    case FormFieldType.wxTmplData: {
      const label = field.name === fieldDef.name ? field.name : `${field.name} / ${fieldDef.name}`;
      return (
        <React.Fragment>
          <label>{label}</label>
          <DynamicJsonArrayTable
            adapter={ObjectJsonTableHelper}
            value={value}
            preview={(item) => <div>{util.inspect(ObjectJsonTableHelper.keyParser(item))}</div>}
            render={({ fieldOpts, index }) => (
              <Card>
                <Input {...fieldOpts('key', index)} placeholder="key" />{' '}
                <Input {...fieldOpts('color', index)} placeholder="color" />
                <Input.TextArea {...fieldOpts('value', index)} placeholder="value" autoSize />
              </Card>
            )}
            onChange={(values) => form.setFieldValue(field.name, values)}
          />
          {/* <DebugInfo data={value} type="util" /> */}
        </React.Fragment>
      );
    }
    case FormFieldType.wxSubscribeData: {
      const label = field.name === fieldDef.name ? field.name : `${field.name} / ${fieldDef.name}`;
      return (
        <React.Fragment>
          <label>{label}</label>
          <DynamicJsonArrayTable
            adapter={ObjectJsonTableHelper}
            value={value}
            preview={(item) => <div>{util.inspect(ObjectJsonTableHelper.keyParser(item))}</div>}
            render={({ fieldOpts, index }) => (
              <Card>
                <Input {...fieldOpts('key', index)} placeholder="key" />
                <Input.TextArea {...fieldOpts('value', index)} placeholder="value" autoSize />
              </Card>
            )}
            onChange={(values) => {
              console.log('onChange', field.name, values);
              form.setFieldValue(field.name, values);
            }}
          />
          <DebugInfo data={value} type="util" />
        </React.Fragment>
      );
    }
    default: {
      const label = field.name === fieldDef.name ? field.name : `${field.name} / ${fieldDef.name}`;
      return (
        <React.Fragment>
          <label>{label}</label>
          <Input id={field.name} type={fieldDef.field.type} {...field} value={value} placeholder={label} />
          {/* <DebugInfo data={{ field, fieldDef, value }} /> */}
        </React.Fragment>
      );
    }
  }
}

const InnerForm = (props: EasyFormProps & FormikProps<FormikValues>) => {
  const { isSubmitting, message, fields, handleSubmit, handleReset, onReset, onCancel, onClear, setValues } = props;

  return (
    <Form
      css={css`
        div > label {
          display: block;
          margin: 0.2rem 0.1rem;
          font-weight: bold;
        }
      `}
    >
      {message && <h1>{message}</h1>}
      {_.map(fields, (formField: FormField, key: string) => (
        <Field key={key} name={key}>
          {({ field, form }: FieldProps<string | number | boolean, FormikValues>) => {
            const hasError = !!(form.touched[formField.name] && form.errors[formField.name]);
            const value = field.value ?? formField.defaultValue;
            return (
              <div key={field.name}>
                <RenderInputComponent<FormikValues, string | number | boolean>
                  form={form}
                  fieldDef={{ field: formField, name: formField.name }}
                  field={field}
                  value={value}
                />
                {/* <Input id={field.name} type={formField.type} {...field} value={value} /> */}
                {formField.help && <div style={{ color: 'grey' }}>{formField.help}</div>}
                {hasError && <div style={{ color: 'red' }}>{form.errors[formField.name]}</div>}
                <Divider dashed style={{ margin: '0.5rem 0' }} />
              </div>
            );
          }}
        </Field>
      ))}
      <Divider />
      <Space>
        <Button type="primary" htmlType="submit" onSubmit={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting' : 'Submit'}
        </Button>
        {onReset && (
          <Button onClick={handleReset} disabled={isSubmitting}>
            {isSubmitting ? 'Resetting' : 'Reset'}
          </Button>
        )}
        {onCancel && <Button onClick={onCancel}>Cancel</Button>}
        {onClear && <Button onClick={() => setValues({ fields })}>Clear</Button>}
      </Space>
    </Form>
  );
};

export const EasyForm = withFormik<EasyFormProps, FormikValues>({
  // Transform outer props into form values
  mapPropsToValues: ({ fields, initialValues }) =>
    Object.assign(
      {},
      ..._.map(fields, (field: FormField, name: string) => ({
        [name]: _.get(initialValues, name) ?? field.defaultValue,
      })),
    ),

  validate: (values: FormikValues, props) => {
    const errors: FormikErrors<FormikValues> = {};
    _.forEach(props.fields, (field: FormField, name: string) => {
      if (field.required && !values[name]) {
        errors[name] = 'Required';
      } else if (field.validate) {
        const error = field.validate(values[name]);
        if (error) errors[name] = error;
      }
    });

    if (!_.isEmpty(errors)) console.warn(errors);

    return errors;
  },

  handleSubmit: (values, { props, setSubmitting }) => {
    const submitted = props.onSubmit(values);
    if (isPromiseAlike(submitted)) {
      submitted.finally(() => setSubmitting(false));
    } else {
      Promise.delay(200).then(() => setSubmitting(false));
    }
  },
})(InnerForm);
