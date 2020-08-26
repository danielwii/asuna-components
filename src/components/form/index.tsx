import { DebugInfo, WithDebugInfo, DynamicJsonArrayTable, ObjectJsonTableHelper, StringTmpl, Uploader } from '..';
import { WithVariable } from '../../helper';
import { css, jsx } from '@emotion/core';
import { FormControl, FormControlLabel, FormHelperText, Switch, TextField } from '@material-ui/core';
import * as antd from 'antd';
import { Divider } from 'antd';
import { changeAntdTheme, generateThemeColor } from 'dynamic-antd-theme';
import * as formik from 'formik';
import { FieldInputProps, FormikProps } from 'formik';
import * as _ from 'lodash';
import * as React from 'react';
import { SketchPicker } from 'react-color';
import * as util from 'util';
import { DefaultFileUploaderAdapterImpl } from '../upload/utils';
import { FormField, FormFieldDef, FormFields, FormFieldType } from './interfaces';

export * from './interfaces';

interface FormProps<FieldsType> {
  message?: string | React.ReactChild;
  body?: string | React.ReactChild;
  fields: FieldsType;
}

interface EasyFormProps extends FormProps<FormFields> {
  // initialValues(props): any;
  onSubmit: (values: any) => Promise<any> | void;
  onClear?: () => Promise<any>;
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
            adapter={new DefaultFileUploaderAdapterImpl()}
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
          {/*<antd.Input.TextArea id={field.name} {...field} autoSize rows={4} value={value} />*/}
          <TextField id={field.name} multiline {...field} value={value} label={label} />
          {/*<DebugInfo data={{ field, fieldDef, value }} type="json" />*/}
        </>
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
              <antd.Card>
                <TextField {...fieldOpts('key', index)} label="key" />
                <TextField {...fieldOpts('subject', index)} label="subject" />
                {/*<TextField {...fieldOpts('template', index)} label="template" />*/}
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
              </antd.Card>
            )}
            onChange={(values) => form.setFieldValue(field.name, values)}
          />
          {/*<DebugInfo data={value} type="util" />*/}
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
              <antd.Card>
                <TextField {...fieldOpts('key', index)} label="key" />{' '}
                <TextField {...fieldOpts('color', index)} label="color" />
                <TextField {...fieldOpts('value', index)} label="value" fullWidth multiline />
              </antd.Card>
            )}
            onChange={(values) => form.setFieldValue(field.name, values)}
          />
          {/*<DebugInfo data={value} type="util" />*/}
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
              <antd.Card>
                <TextField {...fieldOpts('key', index)} label="key" />
                <TextField {...fieldOpts('value', index)} label="value" fullWidth multiline />
              </antd.Card>
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
          {/*<DebugInfo data={{ field, fieldDef, value }} />*/}
        </WithDebugInfo>
      );
    }
  }
}

const InnerForm = (props: EasyFormProps & formik.FormikProps<formik.FormikValues>) => {
  const { touched, errors, isSubmitting, message, body, fields, handleSubmit, handleReset, values, onClear } = props;
  return (
    <formik.Form>
      {message && <h1>{message}</h1>}
      {_.map(fields, (formField: FormField, key: string) => (
        <formik.Field key={key} name={key}>
          {({ field, form }: formik.FieldProps<formik.FormikValues>) => {
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
                {/*<Input id={field.name} type={formField.type} {...field} value={value} />*/}
                {formField.help && <FormHelperText>{formField.help}</FormHelperText>}
                {hasError && <FormHelperText>{form.errors[formField.name]}</FormHelperText>}
                <Divider dashed style={{ margin: '0.5rem 0' }} />
              </FormControl>
            );
          }}
        </formik.Field>
      ))}
      <antd.Divider />
      <antd.Button type="primary" htmlType="submit" onSubmit={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting' : 'Submit'}
      </antd.Button>{' '}
      {onClear && (
        <antd.Button onClick={handleReset} disabled={isSubmitting}>
          {isSubmitting ? 'Resetting' : 'Reset'}
        </antd.Button>
      )}
    </formik.Form>
  );
};

/*  creatable: (key, actions, extras) => {
    // Modal.info({ content: JSON.stringify({ key, actions, extras }) });
    Modal.info({
      okText: '取消',
      content: (
        <EasyForm
          fields={{
            change: {
              name: 'change',
              defaultValue: 0,
              type: 'number',
              validate: value => (_.isNumber(value) && value === 0 ? '不为 0 的数字' : null),
            } as FormField,
            reason: { name: 'reason', defaultValue: '', type: 'string' } as FormField,
          }}
        />
      ),
    });
  },*/
export const EasyForm = formik.withFormik<EasyFormProps, any>({
  // Transform outer props into form values
  mapPropsToValues: (props) =>
    Object.assign({}, ..._.map(props.fields, (field: FormField, name: string) => ({ [name]: field.defaultValue }))),

  validate: (values: formik.FormikValues, props) => {
    const errors: formik.FormikErrors<formik.FormikValues> = {};

    _.forEach(props.fields, (field: FormField, name: string) => {
      if (field.required && !values[name]) {
        errors[name] = 'Required';
      } else if (field.validate) {
        const error = field.validate(values[name]);
        if (error) errors[name] = error;
      }
    });

    return errors;
  },

  handleSubmit: (values, { props, setSubmitting }) => {
    const submitted = props.onSubmit(values);
    if (submitted && submitted.then) submitted.finally(() => setSubmitting(false));
  },
})(InnerForm) as any;
