export const imgError = {
  inserted (el, options) {
    el.onerror = function () {
      this.src = options.value
    }
  }
}
