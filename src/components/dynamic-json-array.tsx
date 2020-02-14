import { Button, List } from 'antd';
import { useFormik } from 'formik';
import * as _ from 'lodash';
import React from 'react';
import { useLogger } from 'react-use';

import { parseJSONIfCould, StaticImplements, WithVariable } from '../helper';

export type FieldOpts = (
  name: string,
  index: number,
) => { name: string; value: string; onChange: React.ChangeEventHandler<HTMLInputElement> };

export type ParsedFieldOpts = {
  name: (name: string) => string;
  value: (name: string) => string;
};

export interface DynamicJsonTableAdapter {
  // 创建新元素
  createItem: () => any;
  // 生成用于输入标签的帮助方法
  fieldParser: (item, index: number) => ParsedFieldOpts;
  parseValue: (value) => any;
  unparseValue: (value) => any;
  clear: (onChange) => any;
  // 包括 onChange 的帮助方法
  getFieldOpts: (formik, item) => FieldOpts;
}

export interface DynamicJsonTableProps<V extends Record<string, string | number>> {
  value: V;
  render: (opts: { formik; item: object; index: number; fieldOpts: FieldOpts }) => React.ReactNode;
  onChange: (values) => void;
  preview: (item) => React.ReactNode;
  adapter: DynamicJsonTableAdapter;
}

@StaticImplements<DynamicJsonTableAdapter>()
export class ObjectArrayHelper {
  static key = 'key';
  static createItem = () => ({ key: '' });
  static keyParser = value => ({ [value.key]: _.omit(value, ObjectArrayHelper.key) });
  static fieldParser = (value: any, index: number): ParsedFieldOpts => ({
    name: (name: string): string => `${index}.${name}`,
    value: (name: string): string => value?.[name],
  });
  static parseValue = value =>
    _.chain(value)
      .toPairs()
      .groupBy(([k]) => k.split('-')[0])
      .flatMap(arr => _.fromPairs(arr.map(([k, v]) => [k.split('-')[1], v])))
      .value();
  static unparseValue = value => _.assign({}, ..._.flatMap(value, (v, i) => _.mapKeys(v, (v, k) => `${i}-${k}`)));
  static clear = onChange => onChange({});
  static getFieldOpts = (formik, item): FieldOpts => (name: string, index: number) => {
    const field = ObjectArrayHelper.fieldParser(item, index);
    return { name: field.name(name), value: field.value(name), onChange: event => formik.handleChange(event) };
  };
}

@StaticImplements<DynamicJsonTableAdapter>()
export class StringArrayHelper {
  static createItem = () => '';
  static keyParser = value => value;
  static fieldParser = (value: any, index: number): ParsedFieldOpts => ({
    name: (name: string): string => `${index}.${name}`,
    value: (name: string): string => value,
  });
  static parseValue = value => value;
  static unparseValue = value => value;
  // static unparseValue = value => _.flatten(_.map(value, field => (_.isObject(field) ? _.values(field) : field)));
  static clear = onChange => onChange([]);
  static getFieldOpts = (formik, item): FieldOpts => (name: string, index: number) => {
    const field = StringArrayHelper.fieldParser(item, index);
    return {
      name: field.name(name),
      value: field.value(name),
      onChange: event => {
        console.log(index, name, event.target.name, event.target.value);
        // formik.handleChange(event);
        formik.values[index] = event.target.value;
        formik.setValues(formik.values);
      },
    };
  };
}

export const DynamicJsonArrayTable: <T extends Record<string, string | number>>(
  props: DynamicJsonTableProps<T>,
) => React.ReactElement<DynamicJsonTableProps<T>> = ({ value, render, onChange, preview, adapter }) => {
  const initialValues = parseJSONIfCould(value as any) ?? {};

  const funcs = {
    parseValue: adapter.parseValue,
    unparseValue: adapter.unparseValue,
    remove: (index: number) => formik.setValues(_.filter(parsedFields, (o, i) => i !== index)),
    add: () => formik.setValues([...parsedFields, adapter.createItem()]),
    clear: () => adapter.clear(onChange),
    fieldOpts: adapter.getFieldOpts,
  };

  const parsedFields: object[] = funcs.parseValue(initialValues);
  const formik = useFormik({
    initialValues: parsedFields,
    validate: values => onChange(funcs.unparseValue(values)),
    onSubmit: values => {},
  });

  useLogger(DynamicJsonArrayTable.name, initialValues, parsedFields, formik.values);

  return (
    <>
      <List
        dataSource={parsedFields.map((v, i) => ({ [i]: v }))}
        renderItem={(indexObject, index) => (
          <WithVariable variable={indexObject[index]}>
            {item => (
              <List.Item
                actions={[
                  <Button size="small" type="danger" onClick={() => funcs.remove(index)}>
                    remove
                  </Button>,
                ]}
                // extra={preview(item)}
              >
                {/*<List.Item.Meta />*/}
                <div>
                  <div>{render({ formik, item, index, fieldOpts: funcs.fieldOpts(formik, item) })}</div>
                  <div>data: {preview(item)}</div>
                </div>
              </List.Item>
            )}
          </WithVariable>
        )}
        footer={
          <>
            <Button size="small" onClick={() => funcs.add()}>
              add
            </Button>{' '}
            <Button size="small" onClick={() => funcs.clear()}>
              clear
            </Button>
          </>
        }
      />
    </>
  );
};
