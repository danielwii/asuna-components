import { ReactElement, ReactNode, ValidationMap, WeakValidationMap } from 'react';

export interface StateFunctionComponent<P = {}, S = {}> {
  (props: P & { children?: (state: S, setState: (state: S) => void) => ReactNode }, context?: any): ReactElement | null;
  propTypes?: WeakValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

export type StateFC<State> = StateFunctionComponent<{ initialState: State }, State>;
