// Oversimplified debounce higher-order function

// Takes a function to be debounced and a wait time
let debounce = function(fn, wait) {
  let timeout;

  // Returns a function whose arguments are caught in `args` and 
  // called if not called in the wait time
  return function(...args) {
    // Getting the `this` context
    let context = this;

    let later = function() {
      fn.call(context, args)
    };

    // if there has been a timeout set, and the function is called
    // again, the timeout is cleared and reset in line 23
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
};
