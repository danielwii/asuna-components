import { css } from '@emotion/core';
import { FormControl, FormControlLabel, FormHelperText, Switch, TextField } from '@material-ui/core';
import { Button, Card, Divider, Space } from 'antd';
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
  StringTmpl,
  Uploader,
  WithDebugInfo,
} from '..';
import { WithVariable } from '../../helper';
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
  onSubmit: (values: any) => Promise<any> | any;
  onReset?: () => Promise<any> | any;
  onCancel?: () => Promise<any> | any;
  onClear?: () => Promise<any> | any;
}

export function RenderInputComponent({
  form,
  fieldDef,
  field,
  value,
}: {
  form: FormikProps<any>;
  fieldDef: FormFieldDef;
  field: FieldInputProps<any>;
  value: any;
}) {
  switch (fieldDef.field.type) {
    case FormFieldType.boolean: {
      return (
        <FormControlLabel
          control={
            <Switch
              onChange={(event, checked) =>
                field.onChange({ target: { id: field.name, name: field.name, value: checked } })
              }
              defaultChecked={value}
              // value={value}
              color="primary"
            />
          }
          label={fieldDef.name}
        />
      );
    }
    case FormFieldType.color: {
      return (
        <>
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
        </>
      );
    }
    case FormFieldType.image: {
      return (
        <>
          <label>{field.name}</label>
          <br />
          <Uploader
            {...{ adapter: new DefaultFileUploaderAdapterImpl(), ...fieldDef.field.extra }}
            // adapter={fieldDef.field.extra?.adapter ?? new DefaultFileUploaderAdapterImpl()}
            value={value}
            onChange={(newValue) => {
              field.onChange({ target: { id: field.name, name: field.name, value: newValue } });
            }}
          />
        </>
      );
    }
    case FormFieldType.string:
    case FormFieldType.text: {
      const label = field.name === fieldDef.name ? field.name : `${field.name} / ${fieldDef.name}`;
      return (
        <>
          {/* <Input.TextArea id={field.name} {...field} autoSize rows={4} value={value} /> */}
          <TextField id={field.name} multiline {...field} value={value} label={label} />
          {/* <DebugInfo data={{ field, fieldDef, value }} type="json" /> */}
        </>
      );
    }
    case 'select': {
      const label = field.name === fieldDef.name ? field.name : `${field.name} / ${fieldDef.name}`;
      const name = field.name;
      return (
        <AsunaSelect
          style={{ width: 240 }}
          placeholder={label}
          {...field}
          onChange={(value) => field.onChange({ target: { id: name, name, value } })}
          value={value}
          {...fieldDef.field.extra}
        />
      );
    }
    case FormFieldType.stringTmpl: {
      const label = field.name === fieldDef.name ? field.name : `${field.name} / ${fieldDef.name}`;
      return (
        <WithDebugInfo info={{ field, fieldDef, value }}>
          <label>{label}</label>
          <StringTmpl tmpl={value} {...field} fields={[]} {...fieldDef.field.extra} />
        </WithDebugInfo>
      );
    }
    case FormFieldType.emailTmplData: {
      const label = field.name === fieldDef.name ? field.name : `${field.name} / ${fieldDef.name}`;
      return (
        <>
          <label>{label}</label>
          <DynamicJsonArrayTable
            adapter={ObjectJsonTableHelper}
            value={value}
            preview={(item) => <div>{util.inspect(ObjectJsonTableHelper.keyParser(item))}</div>}
            render={({ fieldOpts, index }) => (
              <Card>
                <TextField {...fieldOpts('key', index)} label="key" />
                <TextField {...fieldOpts('subject', index)} label="subject" />
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
        </>
      );
    }
    case FormFieldType.wxTmplData: {
      const label = field.name === fieldDef.name ? field.name : `${field.name} / ${fieldDef.name}`;
      return (
        <>
          <label>{label}</label>
          <DynamicJsonArrayTable
            adapter={ObjectJsonTableHelper}
            value={value}
            preview={(item) => <div>{util.inspect(ObjectJsonTableHelper.keyParser(item))}</div>}
            render={({ fieldOpts, index }) => (
              <Card>
                <TextField {...fieldOpts('key', index)} label="key" />{' '}
                <TextField {...fieldOpts('color', index)} label="color" />
                <TextField {...fieldOpts('value', index)} label="value" fullWidth multiline />
              </Card>
            )}
            onChange={(values) => form.setFieldValue(field.name, values)}
          />
          {/* <DebugInfo data={value} type="util" /> */}
        </>
      );
    }
    case FormFieldType.wxSubscribeData: {
      const label = field.name === fieldDef.name ? field.name : `${field.name} / ${fieldDef.name}`;
      return (
        <>
          <label>{label}</label>
          <DynamicJsonArrayTable
            adapter={ObjectJsonTableHelper}
            value={value}
            preview={(item) => <div>{util.inspect(ObjectJsonTableHelper.keyParser(item))}</div>}
            render={({ fieldOpts, index }) => (
              <Card>
                <TextField {...fieldOpts('key', index)} label="key" />
                <TextField {...fieldOpts('value', index)} label="value" fullWidth multiline />
              </Card>
            )}
            onChange={(values) => {
              console.log('onChange', field.name, values);
              form.setFieldValue(field.name, values);
            }}
          />
          <DebugInfo data={value} type="util" />
        </>
      );
    }
    default: {
      const label = field.name === fieldDef.name ? field.name : `${field.name} / ${fieldDef.name}`;
      return (
        <WithDebugInfo info={{ field, fieldDef, value, label }}>
          <TextField id={field.name} type={fieldDef.field.type} {...field} value={value} label={label} />
          {/* <DebugInfo data={{ field, fieldDef, value }} /> */}
        </WithDebugInfo>
      );
    }
  }
}

const InnerForm = (props: EasyFormProps & FormikProps<FormikValues>) => {
  const { isSubmitting, message, fields, handleSubmit, handleReset, onReset, onCancel, onClear, setValues } = props;

  return (
    <Form>
      {message && <h1>{message}</h1>}
      {_.map(fields, (formField: FormField, key: string) => (
        <Field key={key} name={key}>
          {({ field, form }: FieldProps<FormikValues>) => {
            const hasError = !!(form.touched[formField.name] && form.errors[formField.name]);
            const value = field.value ?? formField.defaultValue;
            return (
              <FormControl key={field.name} error={hasError} fullWidth={true}>
                <RenderInputComponent
                  form={form}
                  fieldDef={{ field: formField, name: formField.name }}
                  field={field}
                  value={value}
                />
                {/* <Input id={field.name} type={formField.type} {...field} value={value} /> */}
                {formField.help && <FormHelperText>{formField.help}</FormHelperText>}
                {hasError && <FormHelperText>{form.errors[formField.name]}</FormHelperText>}
                <Divider dashed style={{ margin: '0.5rem 0' }} />
              </FormControl>
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
      ..._.map(fields, (field: FormField, name: string) => ({ [name]: initialValues[name] ?? field.defaultValue })),
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
    if (submitted?.then) {
      submitted.finally(() => setSubmitting(false));
    } else {
      Promise.delay(200).then(() => setSubmitting(false));
    }
  },
})(InnerForm);
