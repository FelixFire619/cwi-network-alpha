(function() {
  var createUser, isUnset, tButton, _ajaxReq, _elementCreater;

  _ajaxReq = function(argRequest, argOnEvent) {
    var jqxhr;
    jqxhr = $.ajax(argRequest).done((function(_this) {
      return function(resp) {
        var iterFunction, _i, _len, _ref;
        if (!isUnset(argOnEvent) && 'done' in argOnEvent) {
          if (toString.call(argOnEvent.done) === "[object Array]") {
            _ref = argOnEvent.done;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              iterFunction = _ref[_i];
              iterFunction(resp);
            }
          } else if (toString.call(argOnEvent.done) === "[object Function]") {
            argOnEvent.done(resp);
          }
        }
      };
    })(this)).fail((function(_this) {
      return function(jqXHR, textStatus, error) {
        var iterFunction, _i, _len, _ref;
        if (!isUnset(argOnEvent) && 'fail' in argOnEvent) {
          if (toString.call(argOnEvent.fail) === "[object Array]") {
            _ref = argOnEvent.fail;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              iterFunction = _ref[_i];
              iterFunction(jqXHR, textStatus, error);
            }
          } else if (toString.call(argOnEvent.fail) === "[object Function]") {
            argOnEvent.fail(jqXHR, textStatus, error);
          }
        }
      };
    })(this)).always((function(_this) {
      return function(resp) {
        var iterFunction, _i, _len, _ref;
        if (!isUnset(argOnEvent) && 'always' in argOnEvent) {
          if (toString.call(argOnEvent.always) === "[object Array]") {
            _ref = argOnEvent.always;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              iterFunction = _ref[_i];
              iterFunction(resp);
            }
          } else if (toString.call(argOnEvent.always) === "[object Function]") {
            argOnEvent.always(resp);
          }
        }
      };
    })(this));
  };

  _elementCreater = function(argTag, argClass, argAppendTo) {
    var element;
    element = void 0;
    element = document.createElement(argTag);
    if (!isUnset(argClass)) {
      element.setAttribute('class', argClass);
    }
    if (!isUnset(argAppendTo)) {
      argAppendTo.appendChild(element);
    }
    return element;
  };

  isUnset = function(argValue, argDefault) {
    if (typeof argDefault !== "undefined" && argDefault !== null) {
      if (typeof argValue !== "undefined" && argValue !== null) {
        return argValue;
      } else {
        return argDefault;
      }
    } else {
      if (typeof argValue !== "undefined" && argValue !== null) {
        return false;
      } else {
        return true;
      }
    }
  };

  authUser = function() {
    textbox_username = document.getElementById('auth_username').value;
    textbox_password = document.getElementById('auth_password').value;

    tempOnEvent = {};
    tempOnEvent.done = [];
    tempOnEvent.fail = [];
    tempOnEvent.always = [];
    tempOnEvent.always.push(function (data) {
      if (data.E == 'true') {
        window.location="authfail.html";
      } else {
        window.location="authed.html";
      }
    })
    tempRequest = {};
    tempRequest.type = "POST";
    tempRequest.url = "/api/authUser";
    tempRequest.contentType = 'application/json; charset=utf-8';
    tempRequest.dataType = 'json';
    tempRequest.data = JSON.stringify({
      "username": textbox_username,
      "password": textbox_password,
    });
    _ajaxReq(tempRequest, tempOnEvent);
  }

  createUser = function() {
    textbox_username = document.getElementById('textbox_username').value;
    textbox_password1 = document.getElementById('textbox_password1').value;
    textbox_password2 = document.getElementById('textbox_password2').value;
    textbox_email = document.getElementById('textbox_email').value;

    if (textbox_password1 != textbox_password2) {
      window.location="rfail.html";
      return
    }

    tempOnEvent = {};
    tempOnEvent.done = [];
    tempOnEvent.fail = [];
    tempOnEvent.always = [];
    tempOnEvent.always.push(function (data) {
      if (data.E == 'true') {
        window.location="rfail.html";
      } else {
        window.location="created.html";
      }
    })
    tempRequest = {};
    tempRequest.type = "POST";
    tempRequest.url = "/api/createUser";
    tempRequest.contentType = 'application/json; charset=utf-8';
    tempRequest.dataType = 'json';
    tempRequest.data = JSON.stringify({
      "username": textbox_username,
      "password": textbox_password1,
      "email": textbox_email
    });
    _ajaxReq(tempRequest, tempOnEvent);
  };

  tButton = document.getElementById('authUser');
  tButton.onclick = authUser;

  tButton = document.getElementById('createUser');
  tButton.onclick = createUser;
}).call(this);
