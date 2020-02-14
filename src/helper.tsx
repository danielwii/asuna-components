import * as _ from 'lodash';
import React, { ReactElement, ReactNode, ValidationMap, WeakValidationMap } from 'react';

/* class decorator */
export function StaticImplements<T>() {
  return (constructor: T) => {};
}

export interface StateFunctionComponent<P = {}, S = {}> {
  (props: P & { children?: (state: S, setState: (state: S) => void) => ReactNode }, context?: any): ReactElement | null;
  propTypes?: WeakValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

export type StateFC<State> = StateFunctionComponent<{ initialState: State }, State>;

export function parseJSONIfCould(value?: string): any {
  try {
    if (value) return JSON.parse(value);
  } catch (e) {}
  return value;
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
