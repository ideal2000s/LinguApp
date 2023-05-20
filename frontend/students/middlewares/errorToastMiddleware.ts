// import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
// import ToastStatusEnum from '../constants/ToastStatusEnum';
// import * as ToastsAction from '../stores/toasts/ToastsAction';
// import { tAppState } from 'students/stores/rootStore';
// import LinguAction from 'students/types/LinguAction';
// import LinguError from 'students/types/Error';

// export default function errorToastMiddleware(): Middleware {
//   return (store: MiddlewareAPI<Dispatch, AppState>) => (next: Dispatch) => (
//     action: LinguAction<any>
//   ): void => {
//     if (action.error) {
//       const errorAction = action as Required<LinguAction<LinguError>>;

//       next(ToastsAction.add(errorAction.payload.message, ToastStatusEnum.Error));
//     }

//     next(action);
//   };
// }
