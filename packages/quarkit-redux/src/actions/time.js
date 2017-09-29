
/*
 * action types
 */

export const TIME_UPDATE = 'TIME_UPDATE'


/*
 * action creators
 */

export function updateTime(time = Date.now()) {
  return {
    type: TIME_UPDATE,
    currentTime: time,
  }
}
