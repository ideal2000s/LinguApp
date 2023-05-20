import { tEventName } from 'students/views/shared/bundles/events/EventDispatcher';

export const getAllFilterConditions = (paramName: tEventName): string[] => {
  const url = new URL(window.location.href);

  return url.searchParams.getAll(paramName);
};

export const getOneFilterCondition = (paramName: tEventName): string | null => {
  const conditions = getAllFilterConditions(paramName);

  return conditions[0] || null;
};
