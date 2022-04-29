export function numberWithCommas(x) {
  //convert numbers into string with thousand comma separators

  if (x === null || x === undefined || isNaN(x)) return "";
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export function numberWithoutCommas(x) {
  // return string without thousand comma separators
  if (!x) {
    return "0";
  }

  // eslint-disable-next-line
  let result = x.toString().replace(/\,/g, "");
  if (!isNaN(result)) {
    return result;
  }
  return x;
}

export const checkMinMax = (value, min, max) => {
  //return value by checking given min/max values

  if (!isNaN(min) && value < min) {
    return min;
  }

  if (!isNaN(max) && value > max) {
    return max;
  }

  return value;
};

export const removePrefix = (value, prefix) => {
  // string with prefix removed
  if (prefix && prefix.length > 0 && value.startsWith(prefix)) {
    return value.slice(prefix.length);
  }
  return value;
};

export const removePostfix = (value, postfix) => {
  // string with postfix removed
  if (postfix && postfix.length > 0 && value.endsWith(postfix)) {
    return value.slice(0, -postfix.length);
  }
  return value;
};

/* istanbul ignore next */
export function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}
