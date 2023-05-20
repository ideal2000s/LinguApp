import { useCallback, useRef } from 'react';
import { EventDispatcher } from '.';
import { ICallbackPayload, IEventListener } from './EventDispatcher';

interface IReturnedObject {
  dispatchEvent: EventDispatcher['dispatchEvent'];
  addListener: EventDispatcher['addListener'];
}

const useEventDispatcher = (): IReturnedObject => {
  const dispatcherRef = useRef<EventDispatcher>(new EventDispatcher());

  const dispatchEvent = useCallback(
    (eventName: IEventListener['eventName'], payload: ICallbackPayload) => {
      dispatcherRef.current.dispatchEvent(eventName, payload);
    },
    []
  );

  const addListener = useCallback(
    (eventName: IEventListener['eventName'], listener: IEventListener['listener']) => {
      return dispatcherRef.current.addListener(eventName, listener);
    },
    []
  );

  return {
    dispatchEvent,
    addListener
  };
};

export default useEventDispatcher;
