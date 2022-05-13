function dateFormat(date, fmt) {
  let o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
  return fmt;
}

/**
 *
 * @param {*} value
 * @return yyyy/MM/dd hh:mm:ss
 */
export function format_ymdhms1(value) {
  if (!value) {
    return '';
  }
  return dateFormat(new Date(value), 'yyyy/MM/dd hh:mm:ss');
}

/**
 *
 * @param {*} value
 * @return yyyy/MM/dd
 */
export function format_ymd1(value) {
  if (!value) {
    return '';
  }
  return format_ymdhms1(value).substring(0, 10);
}

/**
 *
 * @param {*} value
 * @return yyyy-MM-dd hh:mm:ss
 */
export function format_ymdhms2(value) {
  if (!value) {
    return '';
  }
  return format_ymdhms1(value).replace(/\//g, '-');
}

/**
 *
 * @param {*} value
 * @return yyyy-MM-dd
 */
export function format_ymd2(value) {
  if (!value) {
    return '';
  }
  return format_ymdhms1(value).replace(/\//g, '-').substring(0, 10);
}

/**
 *
 * @param {*} value
 * @return yyyy-MM-dd hh:mm
 */
export function format_ymdhm1(value) {
  if (!value) {
    return '';
  }
  return format_ymdhms1(value).replace(/\//g, '-').substring(0, 16);
}

/**
 *
 * @param {*} value
 * @return yyyy年MM月dd日 hh:mm
 */
export function stringFromDate2(value) {
  if (!value) {
    return '';
  }
  return dateFormat(new Date(value), 'yyyy年MM月dd日 hh:mm');
}

/**
 *
 * @param {*} value
 * @return yyyy年MM月dd日
 */
export function stringFromDate3(value) {
  if (!value) {
    return '';
  }
  return stringFromDate2(value).substring(0, 10);
}

/**
 *
 * @param {*} str
 * @return MM月dd日 hh:mm
 */
export function stringFromDateToNormal(str) {
  if (!str) {
    return '';
  }
  return dateFormat(new Date(str), 'MM月dd日 hh:mm');
}

/**
 *
 * @param {*} time1
 * @param {*} time2
 * @return 两个时间相隔天数
 */
export function apartDays(time1, time2) {
  let t1 = new Date(time1).getTime();
  let t2 = new Date(time2).getTime();
  return Math.ceil((t1 - t2) / 24 / 60 / 60 / 1000);
}
