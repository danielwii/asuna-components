import { Button, List } from 'antd';
import { useFormik } from 'formik';
import * as _ from 'lodash';
import React from 'react';
import { useLogger } from 'react-use';

import { parseJSONIfCould, StaticImplements, WithVariable } from '../helper';
import { DebugInfo } from './debug';

export type FieldOpts = (
  name: string,
  index: number,
) => { name: string; value: string; onChange: React.ChangeEventHandler<HTMLInputElement> };

export type ParsedFieldOpts = {
  name: (name: string) => string;
  value: (name: string) => string;
};

export interface DynamicJsonTableAdapter {
  createItem: () => object;
  fieldParser: (item, index: number) => ParsedFieldOpts;
}

export interface DynamicJsonTableProps<V extends Record<string, string | number>> {
  value: V;
  render: (opts: { formik; item: object; index: number; fieldOpts: FieldOpts }) => React.ReactNode;
  onChange: (values) => void;
  preview: (item) => React.ReactNode;
  // item part
  createItem: () => object;
  fieldOptsParser: (item, index: number) => ParsedFieldOpts;
}

@StaticImplements<DynamicJsonTableAdapter>()
export class IndexArrayHelper {
  static key = 'key';
  static createItem = () => ({ key: '' });
  static keyParser = value => ({ [value.key]: _.omit(value, IndexArrayHelper.key) });
  static fieldParser = (value: object, index: number): ParsedFieldOpts => ({
    name: (name: string): string => `${index}.${name}`,
    value: (name: string): string => value?.[name],
  });
}

export const DynamicJsonArrayTable: <T extends Record<string, string | number>>(
  props: DynamicJsonTableProps<T>,
) => React.ReactElement<DynamicJsonTableProps<T>> = ({ value, render, onChange, preview, fieldOptsParser }) => {
  const initialValues = parseJSONIfCould(value as any) ?? {};

  const funcs = {
    parseValue: value =>
      _.chain(value)
        .toPairs()
        .groupBy(([k]) => k.split('-')[0])
        .flatMap(arr => _.fromPairs(arr.map(([k, v]) => [k.split('-')[1], v])))
        .value(),
    unparseValue: value => _.assign({}, ..._.flatMap(value, (v, i) => _.mapKeys(v, (v, k) => `${i}-${k}`))),
    remove: (index: number) => formik.setValues(_.filter(parsedFields, (o, i) => i !== index)),
    add: () => formik.setValues([...parsedFields, { key: '' }]),
    clear: () => onChange({}),
    fieldOpts: (formik, item): FieldOpts => (name: string, index: number) => {
      const field = fieldOptsParser(item, index);
      return { name: field.name(name), value: field.value(name), onChange: event => formik.handleChange(event) };
    },
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
              <>
                <DebugInfo data={formik.values} debug type="util" />

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
              </>
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
