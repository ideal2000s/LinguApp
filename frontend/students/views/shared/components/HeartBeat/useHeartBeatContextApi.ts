import { ContextType, useContext } from 'react';
import HeartBeatContext from './HeartBeatContext';

function useHeartBeatContextApi(): ContextType<typeof HeartBeatContext> {
  return useContext(HeartBeatContext);
}

export default useHeartBeatContextApi;
