const get12HourTime = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

export const getDateTimestamp = (date: string): number =>
  Math.floor(new Date(date).getTime() / 1000);
const getNextHalfHour = () => {
  const date = new Date();
  const currentMinutes = date.getMinutes();
  const minutesToAdd = 30 - (currentMinutes % 30 || 0);

  date.setMinutes(date.getMinutes() + minutesToAdd);
  return date;
};

const getOneHourFromPassedTimestamp = (timestamp: Date) => {
  const date = new Date(timestamp);
  date.setHours(timestamp.getHours() + 1);

  return date;
};

const getUnixTimestamp = (date: Date) => {
  return Math.floor(date.getTime() / 1000);
};
type TimeFrame = {
  start_time: number;
  end_time: number;
};
export const displayMeetingTime = (timeframe: TimeFrame): string => {
  const [startTime, endTime] = [timeframe.start_time, timeframe.end_time].map((timestamp) => {
    return get12HourTime(timestamp).toLowerCase();
  });

  return `${
    startTime.slice(-2) === endTime.slice(-2) ? startTime.slice(0, -3) : startTime
  } - ${endTime}`;
};

export const convertUTCDate = (date: Date): Date => {
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  const offset = date.getTimezoneOffset() / 60;
  const hours = date.getHours();

  utcDate.setHours(hours - offset);

  return utcDate;
};

export const applyTimezone = (date: Date): number => {
  const localizedDate = new Date(date);

  return getUnixTimestamp(localizedDate);
};

export const getDefaultEventStartTime = (): Date => {
  const startDate = getNextHalfHour();
  return convertUTCDate(startDate);
};

export const getDefaultEventEndTime = (): Date => {
  const startDate = getNextHalfHour();
  const endDate = getOneHourFromPassedTimestamp(startDate);
  return convertUTCDate(endDate);
};

export const getMinimumEventEndTime = (inputDate: string): Date => {
  const date = new Date(inputDate);
  date.setMinutes(date.getMinutes() + 1);
  return date;
};
