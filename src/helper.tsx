/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button, Tooltip } from 'antd';
import * as _ from 'lodash';
import React, { ReactElement, ReactNode, ValidationMap, WeakValidationMap } from 'react';
import { useAsync } from 'react-use';
import * as util from 'util';
import { ErrorInfo, Loading } from './components';

/* class decorator */
export function StaticImplements<T>() {
  return (constructor: T) => {};
}

export interface CustomFC<P = {}, R = () => React.ReactNode> {
  propTypes?: WeakValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
  (props: P & { children?: R }, context?: any): ReactElement | null;
}

export type StateChildren<S> = (state: S, setState: (state: S) => void) => ReactNode;
export type StateFunctionComponent<P = {}, S = {}> = CustomFC<P, StateChildren<S>>;
export type StateFC<State> = StateFunctionComponent<{ initialState?: State }, State>;

export function parseString(value?: any): string {
  return value ? (_.isString(value) ? value : JSON.stringify(value)) : '';
}

export function parseJSONIfCould(value?: string): any {
  try {
    if (value) return JSON.parse(value);
  } catch (e) {}
  return value;
}

export function isJson(value): boolean {
  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    return false;
  }
}

export function castToArrays(value: string): string[] {
  return isJson(value) ? JSON.parse(value) : _.compact(value?.split(','));
}

// export function valueToArrays(value: string | string[]): string[] {
//   return value ? (_.isArray(value) ? value : castToArrays(value)) : [];
// }

export const StoreProvider: StateFC<any> = ({ initialState, children }) => {
  const [state, setState] = React.useState(initialState);
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        > div {
          flex: 0 0 calc(50% - 0.5rem);
          border: silver dashed 1px;
          padding: 0.5rem;
          margin: 0.2rem;
        }
      `}
    >
      <div>{children(state, setState)}</div>
      <div>
        <pre>{util.inspect({ state, initialState })}</pre>
      </div>
    </div>
  );
};

export function TooltipContent({ value, link }: { value: any; link?: boolean }) {
  let component = _.isObject(value) ? util.inspect(value) : value;
  const length = 30;
  if (typeof value === 'string' && value.length > length) {
    const shortValue = `${value.slice(0, length)}...`;
    if (link) {
      return <TextLink url={value} text={shortValue} />;
    }
    component = (
      <Tooltip title={value}>
        <div style={{ maxWidth: '15rem' }}>{shortValue}</div>
      </Tooltip>
    );
    return <React.Fragment>{component}</React.Fragment>;
  }
  return link ? <TextLink url={component} text={component} /> : <React.Fragment>{component}</React.Fragment>;
}

function TextLink({ url, text }: { url: string; text?: string }) {
  return (
    <a href={url} target="_blank">
      {text || url}
    </a>
  );
}

export const WithLoading: React.FC<{ loading: boolean; error: any; retry?: () => any }> = ({
  loading,
  error,
  retry,
  children,
}) => {
  if (loading) return <Loading type="fold" />;
  if (error)
    return (
      <ErrorInfo>
        {retry && <Button onClick={() => retry()}>Reload</Button>}
        <pre>{util.inspect(error)}</pre>
      </ErrorInfo>
    );

  if (_.isFunction(children)) {
    const Component = children as React.FC;
    return <Component />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export function WithFuture<R>({
  future,
  fallback,
  children,
}: {
  future: () => Promise<R>;
  fallback?: React.ReactElement;
  children: ((props: R) => React.ReactNode) | React.ReactNode;
}): React.ReactElement {
  const { loading, value, error } = useAsync(future);

  if (loading) return fallback ?? <Loading type="circle" />;
  if (error)
    return (
      <ErrorInfo>
        <pre>{util.inspect(error)}</pre>
      </ErrorInfo>
    );

  return _.isFunction(children) ? (
    <React.Fragment>{children(value as any)}</React.Fragment>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
}

export function WithSuspense<R>({
  future,
  fallback,
  children,
}: {
  future: () => Promise<R>;
  fallback?: React.ReactElement;
  children: ((props: R) => React.ReactNode) | React.ReactNode;
}): React.ReactElement {
  const Component = React.lazy(
    () =>
      new Promise(async (resolve) => {
        const data = await future();
        resolve({
          default: () =>
            _.isFunction(children) ? (
              <React.Fragment>{children(data)}</React.Fragment>
            ) : (
              <React.Fragment>{children}</React.Fragment>
            ),
        } as any);
      }),
  );

  return (
    <React.Suspense fallback={fallback ?? <Loading type="circle" />}>
      <Component />
    </React.Suspense>
  );
}

export function WithVariable<V>({
  variable,
  children,
}: {
  variable: V;
  children: (props: NonNullable<V>) => React.ReactNode;
}) {
  if (_.isNull(variable) || _.isUndefined(variable)) {
    return <span>n/a</span>;
  }
  return <React.Fragment>{children(variable as any)}</React.Fragment>;
}

export const withP = <P, R>(parameter: P, fn: (p: P) => R) => fn(parameter);
export const withP2 = <P1, P2, R>(parameter1: P1, parameter2: P2, fn: (p1: P1, p2: P2) => R) =>
  fn(parameter1, parameter2);
export const withP3 = <P1, P2, P3, R>(
  parameter1: P1,
  parameter2: P2,
  parameter3: P3,
  fn: (p1: P1, p2: P2, p3: P3) => R,
) => fn(parameter1, parameter2, parameter3);
export const fnWithP3 = <P1, P2, P3, R>(parameter1: P1, parameter2: P2, parameter3: P3) => (
  fn: (p1: P1, p2: P2, p3: P3) => R,
): R => fn(parameter1, parameter2, parameter3);
