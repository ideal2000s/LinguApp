import { DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RouterAction } from 'connected-react-router';
import { tAppState } from 'students/stores/rootStore';
import LinguAction from './LinguAction';

export type tReduxDispatch<P> = Dispatch<LinguAction<P>>;

export type tReduxDispatchProp<P> = DispatchProp<LinguAction<P>>;

export type tReduxProps<P = never, R = never> = [R] extends [never]
  ? tReduxDispatchProp<P>
  : tReduxDispatchProp<P> & RouteComponentProps<R>;

export type tApiThunkAction<Payload, ReturnValue> = ThunkAction<
  ReturnValue,
  tAppState,
  unknown,
  LinguAction<Payload> | RouterAction
>;
