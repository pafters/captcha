function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var axios = _interopDefault(require('axios'));

function CaptchaProps() {
  var _useState = React.useState(false),
    captchaIsActive = _useState[0],
    updateCaptchaIsActive = _useState[1];
  var _useState2 = React.useState(false),
    captchaToken = _useState2[0],
    updateCaptchaToken = _useState2[1];
  return {
    captchaIsActive: captchaIsActive,
    updateCaptchaIsActive: updateCaptchaIsActive,
    captchaToken: captchaToken,
    updateCaptchaToken: updateCaptchaToken
  };
}

var styles = {"captchaSlider":"_captchaSlider__captchaSlider__3X5TZ","captchaSliderPortrait":"_captchaSlider__captchaSliderPortrait__2vcpy"};

function CaptchaSlider(_ref) {
  var isDesktop = _ref.isDesktop,
    updateCaptchaData = _ref.updateCaptchaData,
    updateCaptchaIndex = _ref.updateCaptchaIndex,
    captchas = _ref.captchas;
  var _useState = React.useState(0),
    width = _useState[0],
    setWidth = _useState[1];
  var _useState2 = React.useState(0),
    failedCounts = _useState2[0],
    updateFailedCounts = _useState2[1];
  var changeWidth = function changeWidth(event) {
    setWidth(event.target.value);
    updateCaptchaIndex(event.target.value / 20);
  };
  function checkRangePosition() {
    updateFailedCounts(failedCounts + 1);
    if (failedCounts == 4) {
      updateFailedCounts(0);
      updateCaptchaData();
    }
  }
  return /*#__PURE__*/React__default.createElement("div", null, captchas && /*#__PURE__*/React__default.createElement("input", {
    className: isDesktop ? styles.captchaSliderDesktop + ' ' + styles.captchaSlider : styles.captchaSliderPortrait + ' ' + styles.captchaSlider,
    type: "range",
    onChange: changeWidth,
    onMouseUp: function onMouseUp() {
      return checkRangePosition();
    },
    onTouchEnd: function onTouchEnd() {
      return checkRangePosition();
    },
    min: 0,
    max: (captchas.length - 1) * 20,
    step: 20,
    value: width
  }));
}

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var styles$1 = {"captchaInputDesktop":"_captchaInput__captchaInputDesktop__7eDNZ","captchaInputPortrait":"_captchaInput__captchaInputPortrait__1M1wF"};

function CaptchaInput(_ref) {
  var submitValue = function submitValue() {
    try {
      var _temp = _catch(function () {
        return Promise.resolve(cbm.checkCaptcha({
          code: captchaValue,
          captchaIDs: captchaIDs,
          index: captchaIndex,
          type: captchaType
        })).then(function (answer) {
          if (answer) {
            updateCaptchaToken(answer.captchaToken);
            updateCaptchaIsActive(false);
            if (audioStop) audioStop();
          }
        });
      }, function () {
        updateCaptchaData(true);
        if (audioStop) audioStop();
        updErrCounts(errCounts + 1);
        if (errCounts == 5) {
          updErrCounts(0);
          updateCaptchaToken(false);
          updateCaptchaIsActive(false);
        }
      });
      return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var isDesktop = _ref.isDesktop,
    cbm = _ref.cbm,
    updateCaptchaValue = _ref.updateCaptchaValue,
    updateCaptchaToken = _ref.updateCaptchaToken,
    updateInputRef = _ref.updateInputRef,
    captchaIDs = _ref.captchaIDs,
    captchaValue = _ref.captchaValue,
    updateCaptchaIsActive = _ref.updateCaptchaIsActive,
    updateCaptchaData = _ref.updateCaptchaData,
    audioStop = _ref.audioStop,
    updErrCounts = _ref.updErrCounts,
    errCounts = _ref.errCounts,
    captchaIndex = _ref.captchaIndex,
    captchaType = _ref.captchaType;
  var captchaInpRef = React.useRef();
  React.useEffect(function () {
    updateInputRef(captchaInpRef);
  }, []);
  return /*#__PURE__*/React__default.createElement("input", {
    ref: captchaInpRef,
    onKeyUp: function onKeyUp(event) {
      if (event.key == 'Enter') {
        captchaInpRef.current.value = '';
        submitValue();
      }
    },
    onChange: function onChange() {
      return updateCaptchaValue(captchaInpRef.current.value);
    },
    className: isDesktop ? styles$1.captchaInputDesktop : styles$1.captchaInputPortrait,
    placeholder: "\u0412\u0430\u0448 \u043E\u0442\u0432\u0435\u0442"
  });
}

var styles$2 = {"captchaSubmitBttn":"_captchaSubmitBttn__captchaSubmitBttn__39UTC","captchaSubmitBttnDesktop":"_captchaSubmitBttn__captchaSubmitBttnDesktop__2BWKq","captchaSubmitBttnPortrait":"_captchaSubmitBttn__captchaSubmitBttnPortrait__3N5Ge","noselect":"_captchaSubmitBttn__noselect__aMDFu"};

function CaptchaSubmitBttn(_ref) {
  var submitValue = function submitValue() {
    try {
      if (inputRef) inputRef.current.value = '';
      var _temp = _catch(function () {
        if (updateActiveStates) {
          updateActiveStates([false, false, false, false, false, false, false, false, false]);
        }
        return Promise.resolve(cbm.checkCaptcha({
          code: captchaValue,
          captchaIDs: captchaIDs,
          index: captchaIndex,
          type: captchaType
        })).then(function (answer) {
          if (answer) {
            updateCaptchaToken(answer.captchaToken);
            updateCaptchaIsActive(false);
            if (audioStop) audioStop();
          }
        });
      }, function () {
        updateCaptchaData(true);
        if (updateCaptchaIndex) updateCaptchaIndex(1);
        if (audioStop) audioStop();
        updErrCounts(errCounts + 1);
        if (errCounts == 5) {
          updErrCounts(0);
          updateCaptchaToken(false);
          updateCaptchaIsActive(false);
        }
      });
      return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var isDesktop = _ref.isDesktop,
    captchaValue = _ref.captchaValue,
    cbm = _ref.cbm,
    captchaIDs = _ref.captchaIDs,
    updateCaptchaToken = _ref.updateCaptchaToken,
    updateCaptchaIsActive = _ref.updateCaptchaIsActive,
    updateCaptchaData = _ref.updateCaptchaData,
    inputRef = _ref.inputRef,
    audioStop = _ref.audioStop,
    updErrCounts = _ref.updErrCounts,
    errCounts = _ref.errCounts,
    captchaIndex = _ref.captchaIndex,
    updateActiveStates = _ref.updateActiveStates,
    captchaType = _ref.captchaType,
    updateCaptchaIndex = _ref.updateCaptchaIndex;
  return /*#__PURE__*/React__default.createElement("button", {
    onClick: submitValue,
    className: isDesktop ? styles$2.captchaSubmitBttnDesktop + ' ' + styles$2.captchaSubmitBttn + ' ' + styles$2.noselect : styles$2.captchaSubmitBttnPortrait + ' ' + styles$2.captchaSubmitBttn + ' ' + styles$2.noselect
  }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C");
}

var styles$3 = {"updateCaptchaBttnDesktop":"_updateCaptchaBttn__updateCaptchaBttnDesktop__rG2YZ","updateCaptchaBttnPortrait":"_updateCaptchaBttn__updateCaptchaBttnPortrait__3VOLc"};

function UpdateCaptchaBttn(_ref) {
  var updateCaptchaData = _ref.updateCaptchaData,
    isDesktop = _ref.isDesktop,
    audioStop = _ref.audioStop,
    updateCaptchaToken = _ref.updateCaptchaToken,
    updateCaptchaIsActive = _ref.updateCaptchaIsActive,
    updateCaptchaIndex = _ref.updateCaptchaIndex;
  var _useState = React.useState(0),
    rerunCounts = _useState[0],
    updateRerunCounts = _useState[1];
  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    onClick: function onClick() {
      updateRerunCounts(rerunCounts + 1);
      if (rerunCounts == 5) {
        if (updateCaptchaIndex) updateCaptchaIndex(1);
        updateRerunCounts(0);
        updateCaptchaToken(false);
        updateCaptchaIsActive(false);
      } else {
        if (audioStop) audioStop();
        updateCaptchaData(true);
      }
    },
    className: isDesktop ? styles$3.updateCaptchaBttnDesktop : styles$3.updateCaptchaBttnPortrait
  }));
}

var styles$4 = {"captchaImg":"_textCaptcha__captchaImg__3cdeX","captchaBttnsContainer":"_textCaptcha__captchaBttnsContainer__15QjO","unswerContainer":"_textCaptcha__unswerContainer__23UTn"};

function TextCaptcha(_ref) {
  var _captchas$captchaInde, _captchas$captchaInde2, _captchas$captchaInde3;
  var updateCaptchaData = function updateCaptchaData() {
    try {
      var _temp = function () {
        if (captchaIsActive) {
          return Promise.resolve(cbm.getCaptcha('TEXT')).then(function (answer) {
            if (answer) {
              updateCaptchas(answer.captchas);
            }
          });
        }
      }();
      return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var cbm = _ref.cbm,
    updateCaptchaIsActive = _ref.updateCaptchaIsActive,
    updateInputRef = _ref.updateInputRef,
    inputRef = _ref.inputRef,
    isDesktop = _ref.isDesktop,
    captchaValue = _ref.captchaValue,
    updateCaptchaValue = _ref.updateCaptchaValue,
    updateCaptchaToken = _ref.updateCaptchaToken,
    captchaIsActive = _ref.captchaIsActive,
    captchaType = _ref.captchaType;
  var _useState = React.useState(0),
    errCounts = _useState[0],
    updErrCounts = _useState[1];
  var _useState2 = React.useState(''),
    captchas = _useState2[0],
    updateCaptchas = _useState2[1];
  var _useState3 = React.useState(0),
    captchaIndex = _useState3[0],
    updateCaptchaIndex = _useState3[1];
  React.useEffect(function () {
    updateCaptchaData();
    updateCaptchaToken(false);
  }, []);
  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("img", {
    className: styles$4.captchaImg,
    src: (_captchas$captchaInde = captchas[captchaIndex]) === null || _captchas$captchaInde === void 0 ? void 0 : _captchas$captchaInde.body
  }), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(CaptchaSlider, {
    isDesktop: isDesktop,
    updateCaptchaData: updateCaptchaData,
    captchas: captchas,
    updateCaptchaIndex: updateCaptchaIndex
  })), /*#__PURE__*/React__default.createElement("div", {
    className: styles$4.captchaBttnsContainer
  }, /*#__PURE__*/React__default.createElement(UpdateCaptchaBttn, {
    updateCaptchaIndex: updateCaptchaIndex,
    updateCaptchaData: updateCaptchaData,
    isDesktop: isDesktop,
    updateCaptchaIsActive: updateCaptchaIsActive,
    updateCaptchaToken: updateCaptchaToken
  })), /*#__PURE__*/React__default.createElement("div", {
    className: styles$4.unswerContainer
  }, /*#__PURE__*/React__default.createElement(CaptchaInput, {
    isDesktop: isDesktop,
    updateCaptchaValue: updateCaptchaValue,
    cbm: cbm,
    captchaIDs: [(_captchas$captchaInde2 = captchas[captchaIndex]) === null || _captchas$captchaInde2 === void 0 ? void 0 : _captchas$captchaInde2.captchaID],
    updateCaptchaIsActive: updateCaptchaIsActive,
    updateCaptchaData: updateCaptchaData,
    updateCaptchaToken: updateCaptchaToken,
    updateInputRef: updateInputRef,
    updateCaptchaIndex: updateCaptchaIndex,
    captchaValue: captchaValue,
    updErrCounts: updErrCounts,
    errCounts: errCounts,
    captchaType: captchaType
  }), /*#__PURE__*/React__default.createElement(CaptchaSubmitBttn, {
    isDesktop: isDesktop,
    captchaValue: captchaValue,
    cbm: cbm,
    captchaIDs: [(_captchas$captchaInde3 = captchas[captchaIndex]) === null || _captchas$captchaInde3 === void 0 ? void 0 : _captchas$captchaInde3.captchaID],
    updateCaptchaIsActive: updateCaptchaIsActive,
    updateCaptchaData: updateCaptchaData,
    updateCaptchaToken: updateCaptchaToken,
    updateCaptchaIndex: updateCaptchaIndex,
    inputRef: inputRef,
    updErrCounts: updErrCounts,
    errCounts: errCounts,
    captchaType: captchaType
  })));
}

var CONFIG = {
  BACKEND_API: "https://captcha.sixhands.co"
};

var CaptchaBaseModule = /*#__PURE__*/function () {
  function CaptchaBaseModule() {}
  var _proto = CaptchaBaseModule.prototype;
  _proto.postRequest = function postRequest(request, props, headers) {
    if (props === void 0) {
      props = null;
    }
    try {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(axios.post(CONFIG.BACKEND_API + "/" + request, props)).then(function (response) {
          return response.data;
        });
      }, function (error) {
        throw new Error("Error getting data from API: " + error.message);
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.getRequest = function getRequest(request, props) {
    if (props === void 0) {
      props = null;
    }
    try {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(axios.get(CONFIG.BACKEND_API + "/" + request, props)).then(function (response) {
          return response.data;
        });
      }, function (error) {
        throw new Error("Error getting data from API: " + error.message);
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.getCaptcha = function getCaptcha(type) {
    try {
      var _this = this;
      return Promise.resolve(_this.postRequest("captchas", {
        type: type
      })).then(function (answer) {
        if (answer) return answer;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.getServerStatus = function getServerStatus() {
    try {
      var _this2 = this;
      return Promise.resolve(_this2.getRequest("health")).then(function (answer) {
        if (answer) return answer;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.checkCaptcha = function checkCaptcha(req) {
    try {
      var _temp2 = function _temp2() {
        if (answer) return answer;
      };
      var _this3 = this;
      var answer = null;
      var _temp = function () {
        if (req.index) return Promise.resolve(_this3.postRequest("captchas/check", req, true)).then(function (_this3$postRequest) {
          answer = _this3$postRequest;
        });else return Promise.resolve(_this3.postRequest("captchas/check", req, true)).then(function (_this3$postRequest2) {
          answer = _this3$postRequest2;
        });
      }();
      return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  return CaptchaBaseModule;
}();

var styles$5 = {"captchaOuter":"_captchaManager__captchaOuter__Zog3a","captchaContainerDesktop":"_captchaManager__captchaContainerDesktop__spLe0","captchaContainerPortrait":"_captchaManager__captchaContainerPortrait__2eL_P"};

var styles$6 = {"captchaStatusNotificationdDesktop":"_deadCaptcha__captchaStatusNotificationdDesktop__11lxd","captchaStatusNotificationdPortrait":"_deadCaptcha__captchaStatusNotificationdPortrait__2tGCF","serverStatus":"_deadCaptcha__serverStatus__1ZhLj"};

function DeadCaptcha(_ref) {
  var isDesktop = _ref.isDesktop;
  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: styles$6.serverStatus
  }), /*#__PURE__*/React__default.createElement("span", {
    className: isDesktop ? styles$6.captchaStatusNotificationdDesktop : styles$6.captchaStatusNotificationdPortrait
  }, "\u0421\u0435\u0440\u0432\u0435\u0440 \u0441\u043F\u0438\u0442"));
}

var styles$7 = {"captachaExitContainer":"_captchaExitBttn__captachaExitContainer__udUOg","captchaExitBttnPortrait":"_captchaExitBttn__captchaExitBttnPortrait__1C6EM","captchaExitBttnDesktop":"_captchaExitBttn__captchaExitBttnDesktop__hm3KP","noselect":"_captchaExitBttn__noselect__3tM8X"};

function CaptchaExitBttn(_ref) {
  var isDesktop = _ref.isDesktop,
    updateCaptchaIsActive = _ref.updateCaptchaIsActive;
  function leftCaptchaContainer() {
    updateCaptchaIsActive(false);
  }
  return /*#__PURE__*/React__default.createElement("div", {
    className: styles$7.captachaExitContainer + ' ' + styles$7.noselect
  }, /*#__PURE__*/React__default.createElement("img", {
    onClick: leftCaptchaContainer,
    className: isDesktop ? styles$7.captchaExitBttnDesktop : styles$7.captchaExitBttnPortrait
  }));
}

var styles$8 = {"captchaImg":"_mathCaptcha__captchaImg__qj6tz","captchaBttnsContainer":"_mathCaptcha__captchaBttnsContainer__2akf9","unswerContainer":"_mathCaptcha__unswerContainer__RSRiR"};

function TextCaptcha$1(_ref) {
  var _captchas$captchaInde, _captchas$captchaInde2, _captchas$captchaInde3;
  var updateCaptchaData = function updateCaptchaData() {
    try {
      return Promise.resolve(cbm.getCaptcha('MATH')).then(function (answer) {
        if (answer) {
          updateCaptchas(answer.captchas);
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var cbm = _ref.cbm,
    updateCaptchaIsActive = _ref.updateCaptchaIsActive,
    updateInputRef = _ref.updateInputRef,
    inputRef = _ref.inputRef,
    isDesktop = _ref.isDesktop,
    captchaValue = _ref.captchaValue,
    updateCaptchaValue = _ref.updateCaptchaValue,
    updateCaptchaToken = _ref.updateCaptchaToken,
    captchaType = _ref.captchaType;
  var _useState = React.useState(0),
    errCounts = _useState[0],
    updErrCounts = _useState[1];
  var _useState2 = React.useState(''),
    captchas = _useState2[0],
    updateCaptchas = _useState2[1];
  var _useState3 = React.useState(0),
    captchaIndex = _useState3[0],
    updateCaptchaIndex = _useState3[1];
  React.useEffect(function () {
    updateCaptchaData();
    updateCaptchaToken(false);
  }, []);
  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("img", {
    className: styles$8.captchaImg,
    src: (_captchas$captchaInde = captchas[captchaIndex]) === null || _captchas$captchaInde === void 0 ? void 0 : _captchas$captchaInde.body
  }), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(CaptchaSlider, {
    isDesktop: isDesktop,
    updateCaptchaData: updateCaptchaData,
    updateCaptchaIndex: updateCaptchaIndex,
    captchas: captchas
  })), /*#__PURE__*/React__default.createElement("div", {
    className: styles$8.captchaBttnsContainer
  }, /*#__PURE__*/React__default.createElement(UpdateCaptchaBttn, {
    updateCaptchaIndex: updateCaptchaIndex,
    updateCaptchaData: updateCaptchaData,
    isDesktop: isDesktop,
    updateCaptchaIsActive: updateCaptchaIsActive,
    updateCaptchaToken: updateCaptchaToken
  })), /*#__PURE__*/React__default.createElement("div", {
    className: styles$8.unswerContainer
  }, /*#__PURE__*/React__default.createElement(CaptchaInput, {
    isDesktop: isDesktop,
    updateCaptchaValue: updateCaptchaValue,
    cbm: cbm,
    captchaIDs: [(_captchas$captchaInde2 = captchas[captchaIndex]) === null || _captchas$captchaInde2 === void 0 ? void 0 : _captchas$captchaInde2.captchaID],
    updateCaptchaIsActive: updateCaptchaIsActive,
    updateCaptchaData: updateCaptchaData,
    updateCaptchaToken: updateCaptchaToken,
    updateInputRef: updateInputRef,
    updateCaptchaIndex: updateCaptchaIndex,
    captchaValue: captchaValue,
    captchaIndex: captchaIndex,
    updErrCounts: updErrCounts,
    errCounts: errCounts,
    captchaType: captchaType
  }), /*#__PURE__*/React__default.createElement(CaptchaSubmitBttn, {
    isDesktop: isDesktop,
    captchaValue: captchaValue,
    cbm: cbm,
    captchaIDs: [(_captchas$captchaInde3 = captchas[captchaIndex]) === null || _captchas$captchaInde3 === void 0 ? void 0 : _captchas$captchaInde3.captchaID],
    updateCaptchaIsActive: updateCaptchaIsActive,
    updateCaptchaData: updateCaptchaData,
    updateCaptchaToken: updateCaptchaToken,
    updateCaptchaIndex: updateCaptchaIndex,
    inputRef: inputRef,
    captchaIndex: captchaIndex,
    updErrCounts: updErrCounts,
    errCounts: errCounts,
    captchaType: captchaType
  })));
}

var styles$9 = {"captchaImg":"_audioCaptcha__captchaImg__3ptHM","captchaBttnsContainer":"_audioCaptcha__captchaBttnsContainer__2Ea-P","unswerContainer":"_audioCaptcha__unswerContainer__NOx4F","captchaBttn":"_audioCaptcha__captchaBttn__35pmi","captchaSpeechBttn":"_audioCaptcha__captchaSpeechBttn__3riX_","updNoticePort":"_audioCaptcha__updNoticePort__2H4Rv","updNoticeDesk":"_audioCaptcha__updNoticeDesk__1ypt9","hidden":"_audioCaptcha__hidden__3cJWa"};

var styles$a = {"captchaToSpeechBttnDesktop":"_captchaToSpeech__captchaToSpeechBttnDesktop__2fk31","captchaToSpeechBttnPortrait":"_captchaToSpeech__captchaToSpeechBttnPortrait__7Ou-Z"};

function CaptchaToSpeech(_ref) {
  var audioPlay = _ref.audioPlay,
    isDesktop = _ref.isDesktop;
  return /*#__PURE__*/React__default.createElement("div", {
    className: isDesktop ? styles$a.captchaToSpeechBttnDesktop : styles$a.captchaToSpeechBttnPortrait,
    onClick: function onClick() {
      return audioPlay();
    }
  });
}

function AudioCaptcha(_ref) {
  var updateCaptchaData = function updateCaptchaData(isUpd) {
    try {
      return Promise.resolve(cbm.getCaptcha('AUDIO')).then(function (answer) {
        if (answer) {
          updateCaptchas(answer.captchas[0]);
          if (isUpd) {
            if (!noticeIsActive) {
              updateNoticeState(true);
              setTimeout(function () {
                return updateNoticeState(false);
              }, 1000);
            }
          }
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var cbm = _ref.cbm,
    updateCaptchaIsActive = _ref.updateCaptchaIsActive,
    updateInputRef = _ref.updateInputRef,
    inputRef = _ref.inputRef,
    isDesktop = _ref.isDesktop,
    captchaValue = _ref.captchaValue,
    updateCaptchaValue = _ref.updateCaptchaValue,
    updateCaptchaToken = _ref.updateCaptchaToken,
    captchaType = _ref.captchaType;
  var _useState = React.useState(''),
    captchas = _useState[0],
    updateCaptchas = _useState[1];
  var _useState2 = React.useState(false),
    noticeIsActive = _useState2[0],
    updateNoticeState = _useState2[1];
  var _useState3 = React.useState(0),
    errCounts = _useState3[0],
    updErrCounts = _useState3[1];
  var audioPlayer = React.useRef();
  React.useEffect(function () {
    updateCaptchaData();
    updateCaptchaToken(false);
  }, []);
  function audioStop() {
    if (audioPlayer !== null && audioPlayer !== void 0 && audioPlayer.current) {
      audioPlayer.current.pause();
      audioPlayer.current.currentTime = 0;
    }
  }
  function audioPlay() {
    if (audioPlayer !== null && audioPlayer !== void 0 && audioPlayer.current) {
      audioPlayer.current.play();
    }
  }
  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("audio", {
    src: captchas.body,
    ref: audioPlayer
  }), /*#__PURE__*/React__default.createElement("div", {
    className: styles$9.captchaBttnsContainer
  }, /*#__PURE__*/React__default.createElement("div", {
    className: styles$9.captchaBttn
  }, /*#__PURE__*/React__default.createElement(UpdateCaptchaBttn, {
    isDesktop: isDesktop,
    audioPlayer: audioPlayer,
    updateCaptchaData: updateCaptchaData,
    audioStop: audioStop
  })), /*#__PURE__*/React__default.createElement("div", {
    className: styles$9.captchaBttn + ' ' + styles$9.captchaSpeechBttn
  }, /*#__PURE__*/React__default.createElement(CaptchaToSpeech, {
    audioPlay: audioPlay,
    isDesktop: isDesktop
  }))), /*#__PURE__*/React__default.createElement("span", {
    className: isDesktop ? styles$9.updNoticeDesk : styles$9.updNoticePort
  }, noticeIsActive ? 'Капча успешно обновлена!' : 'Прослушайте капчу'), /*#__PURE__*/React__default.createElement("div", {
    className: styles$9.unswerContainer
  }, /*#__PURE__*/React__default.createElement(CaptchaInput, {
    isDesktop: isDesktop,
    updateCaptchaValue: updateCaptchaValue,
    cbm: cbm,
    captchaIDs: [captchas === null || captchas === void 0 ? void 0 : captchas.captchaID],
    updateCaptchaIsActive: updateCaptchaIsActive,
    updateCaptchaData: updateCaptchaData,
    updateCaptchaToken: updateCaptchaToken,
    updateInputRef: updateInputRef,
    updErrCounts: updErrCounts,
    errCounts: errCounts,
    audioStop: audioStop,
    captchaType: captchaType,
    captchaValue: captchaValue
  }), /*#__PURE__*/React__default.createElement(CaptchaSubmitBttn, {
    isDesktop: isDesktop,
    captchaValue: captchaValue,
    cbm: cbm,
    captchaIDs: [captchas === null || captchas === void 0 ? void 0 : captchas.captchaID],
    updateCaptchaIsActive: updateCaptchaIsActive,
    updateCaptchaData: updateCaptchaData,
    updateCaptchaToken: updateCaptchaToken,
    inputRef: inputRef,
    updErrCounts: updErrCounts,
    errCounts: errCounts,
    audioStop: audioStop
  })));
}

var styles$b = {"captchaImg":"_graphCaptcha__captchaImg__nqLeJ","captchaBttnsContainer":"_graphCaptcha__captchaBttnsContainer__3ooHW","unswerContainer":"_graphCaptcha__unswerContainer__3l9MV","captchaDesktop":"_graphCaptcha__captchaDesktop__3vbXC","captchaPortrait":"_graphCaptcha__captchaPortrait__IIGPt","updNoticePort":"_graphCaptcha__updNoticePort__4o2Hr","updNoticeDesk":"_graphCaptcha__updNoticeDesk__1DoUL","container":"_graphCaptcha__container__2NjNQ","captchaContainer":"_graphCaptcha__captchaContainer__1YY-t","gripGadDesktop":"_graphCaptcha__gripGadDesktop__1yrvr","gripGadPortrait":"_graphCaptcha__gripGadPortrait__5zM_K","elemActiveDesktop":"_graphCaptcha__elemActiveDesktop__iTFPN","elemActivePortrait":"_graphCaptcha__elemActivePortrait__3tGlC"};

function GraphCaptcha(_ref) {
  var updateCaptchaData = function updateCaptchaData(isUpd) {
    try {
      updateNoticeState(true);
      updActiveCapthas([]);
      return Promise.resolve(cbm.getCaptcha('GRAPH')).then(function (answer) {
        if (answer) {
          updateCaptchas(answer.captchas);
          updateNoticeState(false);
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var cbm = _ref.cbm,
    updateCaptchaIsActive = _ref.updateCaptchaIsActive,
    inputRef = _ref.inputRef,
    isDesktop = _ref.isDesktop,
    captchaValue = _ref.captchaValue,
    updateCaptchaToken = _ref.updateCaptchaToken,
    captchaType = _ref.captchaType;
  var _useState = React.useState(0),
    errCounts = _useState[0],
    updErrCounts = _useState[1];
  var _useState2 = React.useState([]),
    captchas = _useState2[0],
    updateCaptchas = _useState2[1];
  var _useState3 = React.useState(0),
    captchaIndex = _useState3[0],
    updateCaptchaIndex = _useState3[1];
  var _useState4 = React.useState([]),
    activeCaptchasIndex = _useState4[0],
    updActiveCapthasIndex = _useState4[1];
  var _useState5 = React.useState([]),
    activeCaptchas = _useState5[0],
    updActiveCapthas = _useState5[1];
  var _useState6 = React.useState([false, false, false, false, false, false, false, false, false]),
    activeStates = _useState6[0],
    updateActiveStates = _useState6[1];
  var _useState7 = React.useState(true),
    noticeIsActive = _useState7[0],
    updateNoticeState = _useState7[1];
  React.useEffect(function () {
    updateCaptchaData();
    updateCaptchaToken(false);
  }, []);
  function changeCaptchaState(index) {
    var indexCaptcha = activeCaptchasIndex.indexOf(index);
    var newActiveStates = [].concat(activeStates);
    if (indexCaptcha >= 0) {
      updActiveCapthasIndex([].concat(activeCaptchasIndex).filter(function (elem) {
        return elem !== index;
      }));
      updActiveCapthas([].concat(activeCaptchas).filter(function (item, i) {
        return captchas[index].captchaID !== item;
      }));
      newActiveStates[index] = false;
      updateActiveStates(newActiveStates);
    } else {
      updActiveCapthasIndex([].concat(activeCaptchasIndex, [index]));
      updActiveCapthas([].concat(activeCaptchas, [captchas[index].captchaID]));
      newActiveStates[index] = true;
      updateActiveStates(newActiveStates);
    }
  }
  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: styles$b.container
  }, /*#__PURE__*/React__default.createElement("div", {
    className: isDesktop ? styles$b.captchaContainer + ' ' + styles$b.gripGadDesktop : styles$b.captchaContainer + ' ' + styles$b.gripGadPortrait
  }, captchas.map(function (captcha, index) {
    return /*#__PURE__*/React__default.createElement("div", {
      onClick: function onClick() {
        changeCaptchaState(index);
      },
      key: index,
      className: isDesktop ? styles$b.captchaDesktop + ' ' + (activeStates[index] ? styles$b.elemActiveDesktop : '') : styles$b.captchaPortrait + ' ' + (activeStates[index] ? styles$b.elemActivePortrait : ''),
      style: {
        content: "url(" + (captcha === null || captcha === void 0 ? void 0 : captcha.body) + ")"
      }
    });
  }))), /*#__PURE__*/React__default.createElement("p", {
    className: isDesktop ? styles$b.updNoticeDesk : styles$b.updNoticePort
  }, noticeIsActive ? 'Получаем новую капчу...' : 'Выберите все одинаковые изображения'), /*#__PURE__*/React__default.createElement("div", {
    className: styles$b.captchaBttnsContainer
  }, /*#__PURE__*/React__default.createElement(UpdateCaptchaBttn, {
    updateCaptchaIndex: updateCaptchaIndex,
    updateCaptchaData: updateCaptchaData,
    isDesktop: isDesktop,
    updateCaptchaIsActive: updateCaptchaIsActive,
    updateCaptchaToken: updateCaptchaToken
  })), /*#__PURE__*/React__default.createElement("div", {
    className: styles$b.unswerContainer
  }, /*#__PURE__*/React__default.createElement(CaptchaSubmitBttn, {
    isDesktop: isDesktop,
    captchaValue: captchaValue,
    cbm: cbm,
    captchaIDs: activeCaptchas,
    updateCaptchaIsActive: updateCaptchaIsActive,
    updateCaptchaData: updateCaptchaData,
    updateCaptchaToken: updateCaptchaToken,
    updateCaptchaIndex: updateCaptchaIndex,
    inputRef: inputRef,
    captchaIndex: captchaIndex,
    updErrCounts: updErrCounts,
    errCounts: errCounts,
    captchaType: captchaType,
    updateActiveStates: updateActiveStates
  })));
}

var styles$c = {"captchaImg":"_animeCaptcha__captchaImg__3DINr","captchaBttnsContainer":"_animeCaptcha__captchaBttnsContainer__He0ua","unswerContainer":"_animeCaptcha__unswerContainer__1L07z","captchaDesktop":"_animeCaptcha__captchaDesktop__26YSn","captchaPortrait":"_animeCaptcha__captchaPortrait__23Tn8","updNoticePort":"_animeCaptcha__updNoticePort__3fck7","updNoticeDesk":"_animeCaptcha__updNoticeDesk__31Umt","container":"_animeCaptcha__container__SqIae","captchaContainer":"_animeCaptcha__captchaContainer__3T6nf","gripGadDesktop":"_animeCaptcha__gripGadDesktop__3JMqc","gripGadPortrait":"_animeCaptcha__gripGadPortrait__1vFBN","elemActiveDesktop":"_animeCaptcha__elemActiveDesktop__1XX38","elemActivePortrait":"_animeCaptcha__elemActivePortrait__85TZp","switchButtonDesktop":"_animeCaptcha__switchButtonDesktop__1jb5B","switchButtonPortrait":"_animeCaptcha__switchButtonPortrait__1wl7r","leftButtonPortrait":"_animeCaptcha__leftButtonPortrait__3RKp0","leftButtonDesktop":"_animeCaptcha__leftButtonDesktop__zDJa_","rightButtonPortrait":"_animeCaptcha__rightButtonPortrait__3Whnx","rightButtonDesktop":"_animeCaptcha__rightButtonDesktop__1zo7-","noselect":"_animeCaptcha__noselect__24KUZ"};

function AnimeCaptcha(_ref) {
  var _captchas$captchaInde, _captchas$captchaInde2;
  var updateCaptchaData = function updateCaptchaData(isUpd) {
    try {
      updateNoticeState(true);
      return Promise.resolve(cbm.getCaptcha('ANIME')).then(function (answer) {
        if (answer) {
          updateCaptchas(answer.captchas);
          updStandard(answer.captchas[0]);
          updateNoticeState(false);
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var cbm = _ref.cbm,
    updateCaptchaIsActive = _ref.updateCaptchaIsActive,
    inputRef = _ref.inputRef,
    isDesktop = _ref.isDesktop,
    captchaValue = _ref.captchaValue,
    updateCaptchaToken = _ref.updateCaptchaToken,
    captchaType = _ref.captchaType;
  var _useState = React.useState(0),
    errCounts = _useState[0],
    updErrCounts = _useState[1];
  var _useState2 = React.useState([]),
    captchas = _useState2[0],
    updateCaptchas = _useState2[1];
  var _useState3 = React.useState({}),
    standard = _useState3[0],
    updStandard = _useState3[1];
  var _useState4 = React.useState(1),
    captchaIndex = _useState4[0],
    updateCaptchaIndex = _useState4[1];
  var _useState5 = React.useState(true),
    noticeIsActive = _useState5[0],
    updateNoticeState = _useState5[1];
  React.useEffect(function () {
    updateCaptchaData();
    updateCaptchaToken(false);
  }, []);
  var switchImage = function switchImage(state) {
    var index = captchaIndex + state;
    if (index < 1) index = captchas.length - 1;else if (index > captchas.length - 1) index = 1;
    updateCaptchaIndex(index);
  };
  return /*#__PURE__*/React__default.createElement("div", null, !noticeIsActive && /*#__PURE__*/React__default.createElement("div", {
    className: styles$c.container + ' ' + styles$c.noselect
  }, /*#__PURE__*/React__default.createElement("div", {
    className: isDesktop ? styles$c.captchaContainer + ' ' + styles$c.gripGadDesktop : styles$c.captchaContainer + ' ' + styles$c.gripGadPortrait
  }, /*#__PURE__*/React__default.createElement("div", {
    className: isDesktop ? styles$c.captchaDesktop : styles$c.captchaPortrait,
    style: {
      content: "url(" + (standard === null || standard === void 0 ? void 0 : standard.body) + ")"
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: isDesktop ? styles$c.captchaDesktop : styles$c.captchaPortrait,
    style: {
      background: "url(" + ((_captchas$captchaInde = captchas[captchaIndex]) === null || _captchas$captchaInde === void 0 ? void 0 : _captchas$captchaInde.body) + ") no-repeat center center / cover"
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    onClick: function onClick() {
      return switchImage(-1);
    },
    className: isDesktop ? styles$c.switchButtonDesktop + ' ' + styles$c.leftButtonDesktop : styles$c.switchButtonPortrait + ' ' + styles$c.leftButtonPortrait
  }), /*#__PURE__*/React__default.createElement("div", {
    onClick: function onClick() {
      return switchImage(1);
    },
    className: isDesktop ? styles$c.switchButtonDesktop + ' ' + styles$c.rightButtonDesktop : styles$c.switchButtonPortrait + ' ' + styles$c.rightButtonPortrait
  })))), /*#__PURE__*/React__default.createElement("p", {
    className: isDesktop ? styles$c.updNoticeDesk + ' ' + styles$c.noselect : styles$c.updNoticePort + ' ' + styles$c.noselect
  }, noticeIsActive ? 'Получаем новую капчу...' : 'Приведите в одинаковое положение'), /*#__PURE__*/React__default.createElement("div", {
    className: styles$c.captchaBttnsContainer + ' ' + styles$c.noselect
  }, /*#__PURE__*/React__default.createElement(UpdateCaptchaBttn, {
    updateCaptchaIndex: updateCaptchaIndex,
    updateCaptchaData: updateCaptchaData,
    isDesktop: isDesktop,
    updateCaptchaIsActive: updateCaptchaIsActive,
    updateCaptchaToken: updateCaptchaToken
  })), /*#__PURE__*/React__default.createElement("div", {
    className: styles$c.unswerContainer + ' ' + styles$c.noselect
  }, /*#__PURE__*/React__default.createElement(CaptchaSubmitBttn, {
    isDesktop: isDesktop,
    captchaValue: captchaValue,
    cbm: cbm,
    captchaIDs: [(_captchas$captchaInde2 = captchas[captchaIndex]) === null || _captchas$captchaInde2 === void 0 ? void 0 : _captchas$captchaInde2.captchaID],
    updateCaptchaIsActive: updateCaptchaIsActive,
    updateCaptchaData: updateCaptchaData,
    updateCaptchaToken: updateCaptchaToken,
    updateCaptchaIndex: updateCaptchaIndex,
    inputRef: inputRef,
    updErrCounts: updErrCounts,
    errCounts: errCounts,
    captchaType: captchaType
  })));
}

function CaptchaManager(_ref) {
  var updateCaptchaIsActive = _ref.updateCaptchaIsActive,
    captchaIsActive = _ref.captchaIsActive,
    updateCaptchaToken = _ref.updateCaptchaToken,
    captchaType = _ref.captchaType;
  function screenStatus() {
    return window.innerWidth > window.innerHeight ? true : false;
  }
  var cbm = new CaptchaBaseModule();
  var _useState = React.useState(screenStatus()),
    isDesktop = _useState[0],
    updateIsDesktop = _useState[1];
  var _useState2 = React.useState(''),
    captchaValue = _useState2[0],
    updateCaptchaValue = _useState2[1];
  var _useState3 = React.useState(null),
    inputRef = _useState3[0],
    updateInputRef = _useState3[1];
  var _useState4 = React.useState(false),
    serverIsLiving = _useState4[0],
    updateServerStatus = _useState4[1];
  React.useEffect(function () {
    var fetchObj = function fetchObj() {
      try {
        return Promise.resolve(cbm.getServerStatus()).then(function (answer) {
          if (answer) {
            updateServerStatus(true);
          }
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
    fetchObj();
  }, []);
  window.onresize = function () {
    updateIsDesktop(screenStatus());
  };
  return /*#__PURE__*/React__default.createElement("div", null, " ", captchaIsActive ? /*#__PURE__*/React__default.createElement("div", {
    className: styles$5.captchaOuter
  }, /*#__PURE__*/React__default.createElement("div", {
    className: isDesktop ? styles$5.captchaContainerDesktop : styles$5.captchaContainerPortrait
  }, /*#__PURE__*/React__default.createElement(CaptchaExitBttn, {
    isDesktop: isDesktop,
    updateCaptchaIsActive: updateCaptchaIsActive
  }), serverIsLiving ? captchaType === 'TEXT' ? /*#__PURE__*/React__default.createElement(TextCaptcha, {
    updateCaptchaIsActive: updateCaptchaIsActive,
    isDesktop: isDesktop,
    captchaValue: captchaValue,
    updateCaptchaValue: updateCaptchaValue,
    updateCaptchaToken: updateCaptchaToken,
    inputRef: inputRef,
    updateInputRef: updateInputRef,
    cbm: cbm,
    captchaType: captchaType,
    captchaIsActive: captchaIsActive
  }) : captchaType === 'MATH' ? /*#__PURE__*/React__default.createElement(TextCaptcha$1, {
    updateCaptchaIsActive: updateCaptchaIsActive,
    isDesktop: isDesktop,
    captchaValue: captchaValue,
    updateCaptchaValue: updateCaptchaValue,
    updateCaptchaToken: updateCaptchaToken,
    inputRef: inputRef,
    updateInputRef: updateInputRef,
    cbm: cbm,
    captchaType: captchaType
  }) : captchaType === 'AUDIO' ? /*#__PURE__*/React__default.createElement(AudioCaptcha, {
    updateCaptchaIsActive: updateCaptchaIsActive,
    isDesktop: isDesktop,
    captchaValue: captchaValue,
    updateCaptchaValue: updateCaptchaValue,
    updateCaptchaToken: updateCaptchaToken,
    inputRef: inputRef,
    updateInputRef: updateInputRef,
    cbm: cbm,
    captchaType: captchaType
  }) : captchaType === 'GRAPH' ? /*#__PURE__*/React__default.createElement(GraphCaptcha, {
    updateCaptchaIsActive: updateCaptchaIsActive,
    isDesktop: isDesktop,
    captchaValue: captchaValue,
    updateCaptchaValue: updateCaptchaValue,
    updateCaptchaToken: updateCaptchaToken,
    inputRef: inputRef,
    updateInputRef: updateInputRef,
    cbm: cbm,
    captchaType: captchaType
  }) : captchaType === 'ANIME' ? /*#__PURE__*/React__default.createElement(AnimeCaptcha, {
    updateCaptchaIsActive: updateCaptchaIsActive,
    isDesktop: isDesktop,
    captchaValue: captchaValue,
    updateCaptchaValue: updateCaptchaValue,
    updateCaptchaToken: updateCaptchaToken,
    inputRef: inputRef,
    updateInputRef: updateInputRef,
    cbm: cbm,
    captchaType: captchaType
  }) : /*#__PURE__*/React__default.createElement(React.Fragment, null) : /*#__PURE__*/React__default.createElement(DeadCaptcha, {
    isDesktop: isDesktop
  }))) : /*#__PURE__*/React__default.createElement(React.Fragment, null));
}

exports.CaptchaManager = CaptchaManager;
exports.CaptchaProps = CaptchaProps;
//# sourceMappingURL=index.js.map
