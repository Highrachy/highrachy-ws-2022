import {
  format,
  parseISO,
  getTime as getElapsedTime,
  subDays,
  getHours,
  isPast,
  differenceInCalendarDays,
  isValid,
} from 'date-fns';

/**
 * Date and Time
 * @param {*} date
 */
export const getDate = (date) => format(parseISO(date), 'MMMM DD, YYYY');
export const getDateTime = (date) =>
  format(parseISO(date), 'ddd, MMM D, YYYY h:mm A');
export const getShortDateTime = (date) =>
  format(parseISO(date), 'Do MMM YYYY h:mm A');
export const getShortDate = (date) =>
  format(parseISO(date), 'ddd, MMM D, YYYY');
export const getTinyDate = (date) =>
  isValidDate(date) && format(parseISO(date), 'MMM D, YYYY');
export const getLongDate = (date) =>
  format(parseISO(date), 'dddd, Do MMMM YYYY');
export const getYear = (date) => format(parseISO(date), 'YYYY');
export const getTime = (date) => format(parseISO(date), 'h:mm A');
export const subtractDays = (date, numOfDays) =>
  getElapsedTime(subDays(date, numOfDays));
export const getTimeOfDay = (date) => {
  const hour = getHours(date);
  return (
    (hour < 12 && 'Morning') ||
    (hour < 16 && 'Afternoon') ||
    (hour < 19 && 'Evening') ||
    'Night'
  );
};
export const isPastDate = (date) => isPast(date);
export const differenceInDays = (date) =>
  differenceInCalendarDays(Date.now(), date);

export const formatFilterDate = (date) => format(parseISO(date), 'YYYY-MM-DD');
export const convertToUTC = (date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
export const isValidDate = (date) => isValid(parseISO(date));
