import { v4 as uuidv4 } from 'uuid';

export type tEventName = '*' | string;

type tListenerRemoveCallback = () => void;

export interface IEventListener {
  eventName: tEventName;
  listener: (payload: ICallbackPayload) => void;
}

export interface ICallbackPayload {
  eventName: string;
  data: string[];
}

const ANY_EVENT = '*';

class EventDispatcher {
  private listeners: (IEventListener & { id: string })[];
  name: string;

  constructor() {
    this.listeners = [];
    this.name = uuidv4();
  }

  /**
   * Add new event listener
   *
   * @param eventName
   * @param callback
   * @return {tListenerRemoveCallback} A callback function to remove event listener from the dispatcher listeners list
   */
  addListener(
    eventName: tEventName,
    callback: (payload: ICallbackPayload) => void
  ): tListenerRemoveCallback {
    const id = uuidv4();

    this.listeners.push({ listener: callback, eventName, id });

    return () => {
      this.listeners = this.listeners.filter((listener) => listener.id !== id);
    };
  }

  dispatchEvent(eventName: IEventListener['eventName'], payload: ICallbackPayload): void {
    const listeners = this.listeners.filter(
      (listener) => listener.eventName === eventName || listener.eventName === ANY_EVENT
    );

    listeners.forEach((item) => {
      item.listener(payload);
    });
  }
}

export default EventDispatcher;
