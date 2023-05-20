import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo
} from 'react';
import IdleTimer, { IdleTimerProps } from 'react-idle-timer';
import { useDispatch } from 'react-redux';
import { DEFAULT_IDLE_TIMER, DEFAULT_PING_TIMER } from 'students/constants';
import { lessonTaskActions } from 'students/stores/lessonTask';
import { usePageVisibility } from '../../hooks';

export type tHeartBeatChangeOptionsContextValue = {
  updateOptions: (options?: IdleTimerProps) => void;
} | null;

const HeartBeatContext = React.createContext<IdleTimer | null>(null);
const HeartBeatChangeOptionsContext = React.createContext<tHeartBeatChangeOptionsContextValue>(
  null
);

export default HeartBeatContext;

interface Props {
  options?: IdleTimerProps;
}
export const HeartBeatContextProvider: React.FC<Props> = ({ children, options }) => {
  const [idleOptions, setIdleOptions] = useState<IdleTimerProps>({ stopOnIdle: true });
  const heartBeatApi = useRef<IdleTimer>(null);

  const updateOptions = useCallback(function (newOptions?: IdleTimerProps) {
    if (newOptions) {
      setIdleOptions((opt) => ({ ...opt, ...newOptions }));
    }
  }, []);
  const changeOptionsValue = useMemo(() => ({ updateOptions }), [updateOptions]);

  const dispatch = useDispatch();
  const pingAction = useCallback(() => {
    dispatch(lessonTaskActions.heartBeat());
  }, [dispatch]);
  const isDocumentHidden = usePageVisibility();

  useEffect(() => {
    updateOptions(options);
  }, [options, updateOptions]);

  useEffect(() => {
    let timerId = -1;
    function pingTimeoutAction() {
      return window.setTimeout(() => {
        if (!heartBeatApi.current?.isIdle() && !isDocumentHidden()) {
          pingAction();
        }
        timerId = pingTimeoutAction();
      }, DEFAULT_PING_TIMER);
    }
    timerId = pingTimeoutAction();

    return () => {
      clearTimeout(timerId);
    };
  }, [pingAction, isDocumentHidden]);

  return (
    <>
      <IdleTimer ref={heartBeatApi} timeout={DEFAULT_IDLE_TIMER} {...idleOptions} />
      <HeartBeatContext.Provider value={heartBeatApi.current}>
        <HeartBeatChangeOptionsContext.Provider value={changeOptionsValue}>
          {children}
        </HeartBeatChangeOptionsContext.Provider>
      </HeartBeatContext.Provider>
    </>
  );
};

export function useHeartBeatChangeOptions(options: IdleTimerProps): void {
  const optionsContext = useContext(HeartBeatChangeOptionsContext);

  useEffect(() => {
    if (optionsContext) {
      optionsContext.updateOptions(options);
    }

    return () => {
      if (optionsContext) {
        optionsContext.updateOptions({
          timeout: DEFAULT_IDLE_TIMER
        });
      }
    };
  }, [options, optionsContext]);
}

export function useHeartBeatChangeOptionsContext(): tHeartBeatChangeOptionsContextValue {
  return useContext(HeartBeatChangeOptionsContext);
}
