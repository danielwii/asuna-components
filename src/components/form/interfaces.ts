import * as React from 'react';
import { IUploaderProps } from '../upload';

export enum FormFieldType {
  string = 'string',
  color = 'color',
  number = 'number',
  image = 'image',
  text = 'text',
  select = 'select',
  boolean = 'boolean',
  stringTmpl = 'stringTmpl',
  wxTmplData = 'wxTmplData',
  emailTmplData = 'emailTmplData',
  wxSubscribeData = 'wxSubscribeData',
}

interface BasicFormField<ExtraProps = undefined> {
  name: string;
  type: keyof typeof FormFieldType;
  validate?: (value) => string | null;
  help?: React.ReactChild;
  required?: boolean;
  defaultValue?: boolean | number | string;
  extra?: ExtraProps;
}

export type UploadableFormField = { type: 'image' } & BasicFormField<
  Pick<IUploaderProps, 'adapter' | 'multiple' | 'enableDragMode'>
>;

export type FormField = UploadableFormField | BasicFormField;

export type FormFields = Record<string, FormField>;
export interface FormFieldDef {
  name: string;
  field: FormField;
}
export interface FormFieldsGroup {
  name?: string;
  fields: FormFieldDef[];
}
