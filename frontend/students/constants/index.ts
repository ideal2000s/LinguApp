// declare const ENV_IDLE_TIMER: string;
// declare const ENV_PING_TIMER: string;
// declare const ENV_STUDENT_API_ENDPOINT: string;

export const API_URI = process.env.ENV_STUDENT_API_ENDPOINT || '/api';
export const DEFAULT_IDLE_TIMER =
  parseInt(process.env.ENV_IDLE_TIMER as string) || 180000; // 3min
export const DEFAULT_PING_TIMER = parseInt(process.env.ENV_PING_TIMER as string) || 5000; // 5sec
