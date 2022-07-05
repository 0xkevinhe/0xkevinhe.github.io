Hueman.util = {

  escapeSelector: function(selector) {
    return selector.replace(/[!"$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, '\\$&');
  }

}
