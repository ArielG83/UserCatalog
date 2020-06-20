export const isEmpty = param => {
    if (!param) {
      return true
    }
    if (param instanceof Date || typeof param === 'function') {
      return false
    }
    if (Array.isArray(param)) {
      return !param.length
    }
    if (typeof param === 'object') {
      return !Object.keys(param).length
    }
}

export const genrateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const debounce = (func, wait, immediate) => {
  let timeout

  return function executedFunction() {
    const context = this // eslint-disable-line
    const args = arguments
    const later = function() {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }

    const callNow = immediate && !timeout
    clearTimeout(timeout)

    timeout = setTimeout(later, wait)
    if (callNow) {
      func.apply(context, args)
    }
  }
}