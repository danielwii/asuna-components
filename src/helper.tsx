import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Tooltip, Typography } from 'antd';
import * as _ from 'lodash';
import React, { ReactElement, ReactNode, ValidationMap, WeakValidationMap } from 'react';
import { useAsync, useLogger } from 'react-use';
import * as util from 'util';
import { Loading } from './components';

/* class decorator */
export function StaticImplements<T>() {
  return (constructor: T) => {};
}

export interface CustomFC<P = {}, R = () => React.ReactNode> {
  (props: P & { children?: R }, context?: any): ReactElement | null;
  propTypes?: WeakValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

export type StateChildren<S> = (state: S, setState: (state: S) => void) => ReactNode;
export type StateFunctionComponent<P = {}, S = {}> = CustomFC<P, StateChildren<S>>;
export type StateFC<State> = StateFunctionComponent<{ initialState: State }, State>;

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

export interface IErrorInfoProps {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
}

export const StateStoreProvider: StateFC<{}> = ({ initialState, children }) => {
  const [state, setState] = React.useState(initialState);

  return <div>{children(state, setState)}</div>;
};

export function ErrorInfo(props: IErrorInfoProps & { children?: React.ReactNode }) {
  const { title, subTitle, extra, children } = props;
  return (
    <Result status="error" title={title || 'Error'} subTitle={subTitle} extra={extra}>
      <div className="desc">
        <Typography.Paragraph>
          <CloseCircleOutlined style={{ color: 'red' }} /> {children}
        </Typography.Paragraph>
      </div>
    </Result>
  );
}

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
    return <>{component}</>;
  }
  return link ? <TextLink url={component} text={component} /> : <>{component}</>;
}

function TextLink({ url, text }: { url: string; text?: string }) {
  return (
    <a href={url} target={'_blank'}>
      {text || url}
    </a>
  );
}

export const WithLoading: React.FC<{ loading: boolean; error: any; retry? }> = ({
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

  return <>{children}</>;
};

export function WithFuture<R>({
  async,
  future,
  fallback,
  children,
}: {
  async?: boolean;
  future: () => Promise<R>;
  fallback?: React.ReactElement;
  children: ((props: R) => React.ReactNode) | React.ReactNode;
}): React.ReactElement {
  if (async) {
    const { loading, value, error } = useAsync(future);

    if (loading) return fallback ?? <Loading type="circle" />;
    if (error)
      return (
        <ErrorInfo>
          <pre>{util.inspect(error)}</pre>
        </ErrorInfo>
      );

    return _.isFunction(children) ? <>{children(value as any)}</> : <>{children}</>;
  }

  const Component = React.lazy(
    () =>
      new Promise(async (resolve) => {
        const data = await future();
        resolve({
          default: () => (_.isFunction(children) ? <>{children(data)}</> : <>{children}</>),
        } as any);
      }),
  );

  useLogger(WithFuture.name);

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
  return <>{children(variable as any)}</>;
}
