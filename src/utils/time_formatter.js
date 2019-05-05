import moment from 'moment'

export const timeFromNow = (targetTime) => {
  let time = Math.floor(targetTime - moment().format('X'));
  let dayA = time % (24 * 3600);
  let hourA = dayA % 3600;
  let minuteA = hourA % 60;
  let day = Math.floor(time / ( 24 * 3600 ));
  let hour = Math.floor(dayA / 3600);
  let minute = Math.floor(hourA / 60);
  let second = Math.floor(minuteA);
  return {
    day,
    hour,
    minute,
    second,
  }
};
