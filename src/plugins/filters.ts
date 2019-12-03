import Vue from 'vue';
import fecha from 'fecha';
Vue.filter('date-format', (time: Date, formatText: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  if (typeof time === 'number') {
    time = new Date(time) || new Date();
  }
  const date: Date = new Date(time);
  return fecha.format(date, formatText);
});
