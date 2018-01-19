function directive(e, el, binding, v) {
  // The include element callbacks below can be expensive
  // so we should avoid calling them when we're not active.
  // Explicitly check for false to allow fallback compatibility
  // with non-toggleable components
  if (!e || v.context.isActive === false) return;

  // If click was triggered programmaticaly (domEl.click()) then
  // it shouldn't be treated as click-outside
  // Chrome/Firefox support isTrusted property
  // IE/Edge support pointerType property (empty if not triggered
  // by pointing device)
  if (!e.isTrusted || 'pointerType' in e && !e.pointerType) return;

  // Get value passed to directive
  var val = binding.value || function () {
    return true;
  };
  // Check if callback was passed in object or as the value
  var cb = val.callback || val;
  // Check if additional elements were passed to be included in check
  // (click must be outside all included elements, if any)
  var elements = (val.include || function () {
    return [];
  })();
  // Add the root element for the component this directive was defined on
  elements.push(el);

  // Check if it's a click outside our elements, and then if our callback returns true.
  // Non-toggleable components should take action in their callback and return falsy.
  // Toggleable can return true if it wants to deactivate.
  // Note that, because we're in the capture phase, this callback will occure before
  // the bubbling click event on any outside elements.
  if (!clickedInEls(e, elements) && cb(e)) {
    // Delay setting toggleable inactive to avoid conflicting
    // with an outside click on any activator toggling our state.
    setTimeout(function () {
      return v.context.isActive = false;
    }, 0);
  }
}

function clickedInEls(e, elements) {
  // Get position of click
  var x = e.clientX,
      y = e.clientY;
  // Loop over all included elements to see if click was in any of them

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var el = _step.value;

      if (clickedInEl(el, x, y)) return true;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
}

function clickedInEl(el, x, y) {
  // Get bounding rect for element
  // (we're in capturing event and we want to check for multiple elements,
  //  so can't use target.)
  var b = el.getBoundingClientRect();
  // Check if the click was in the element's bounding rect

  return x >= b.left && x <= b.right && y >= b.top && y <= b.bottom;
}

export default {
  name: 'click-outside',

  bind: function bind(el, binding, v) {
    var onClick = function onClick(e) {
      return directive(e, el, binding, v);
    };
    // iOS does not recognize click events on document
    // or body, this is the entire purpose of the v-app
    // component and [data-app], stop removing this
    var app = document.querySelector('[vf-data-app]') || document.body; // This is only for unit tests
    app.addEventListener('click', onClick, true);
    el._clickOutside = onClick;
  },
  unbind: function unbind(el) {
    var app = document.querySelector('[vf-data-app]') || document.body; // This is only for unit tests
    app && app.removeEventListener('click', el._clickOutside, true);
  }
};