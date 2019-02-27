// Oversimplified throttling function

// Throttle function takes in a function `fn` and a `wait` time
let throttle = function(fn, wait) {
  // call now is false –> don't call the function immediately 
  // when it's invoked
  let callNow = false;

  // return this function that has its arguments caught in `args`
  return function(...args) {
    let context = this;

    // function that will be called later will reset callNow to false and
    // call the function with the appropriate `this` context
    let later = function() {
      callNow = false;
      fn.call(context, args);
    }

    // if `callNow` is false, set it to the result of setting a timeout 
    // before calling the `later` function 
    if (!callNow) {
      callNow = setTimeout(later, wait);
    }
  }
};
