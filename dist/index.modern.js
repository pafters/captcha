import React, { useState, useRef, useEffect, Fragment } from 'react';
import axios from 'axios';

function CaptchaProps() {
  const [captchaIsActive, updateCaptchaIsActive] = useState(false);
  const [captchaToken, updateCaptchaToken] = useState(false);
  return {
    captchaIsActive,
    updateCaptchaIsActive,
    captchaToken,
    updateCaptchaToken
  };
}

var styles = {"captchaSlider":"_captchaSlider__captchaSlider__3X5TZ","captchaSliderPortrait":"_captchaSlider__captchaSliderPortrait__2vcpy"};

function CaptchaSlider({
  isDesktop,
  updateCaptchaData,
  updateCaptchaIndex,
  captchas,
  captchaIndex
}) {
  const [width, setWidth] = useState(0);
  const [failedCounts, updateFailedCounts] = useState(0);
  const changeWidth = event => {
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
  return /*#__PURE__*/React.createElement("div", null, captchas && /*#__PURE__*/React.createElement("input", {
    className: isDesktop ? styles.captchaSliderDesktop + ' ' + styles.captchaSlider : styles.captchaSliderPortrait + ' ' + styles.captchaSlider,
    type: "range",
    onChange: changeWidth,
    onMouseUp: () => checkRangePosition(),
    onTouchEnd: () => checkRangePosition(),
    min: 0,
    max: (captchas.length - 1) * 20,
    step: 20,
    value: width
  }));
}

var styles$1 = {"captchaInputDesktop":"_captchaInput__captchaInputDesktop__7eDNZ","captchaInputPortrait":"_captchaInput__captchaInputPortrait__1M1wF"};

function CaptchaInput({
  isDesktop,
  cbm,
  updateCaptchaValue,
  updateCaptchaToken,
  updateInputRef,
  captchaIDs,
  captchaValue,
  updateCaptchaIsActive,
  updateCaptchaData,
  audioStop,
  updErrCounts,
  errCounts,
  captchaIndex,
  captchaType
}) {
  const captchaInpRef = useRef();
  useEffect(() => {
    updateInputRef(captchaInpRef);
  }, []);
  async function submitValue() {
    try {
      const answer = await cbm.checkCaptcha({
        code: captchaValue,
        captchaIDs: captchaIDs,
        index: captchaIndex,
        type: captchaType
      });
      if (answer) {
        updateCaptchaToken(answer.captchaToken);
        updateCaptchaIsActive(false);
        if (audioStop) audioStop();
      }
    } catch (err) {
      updateCaptchaData(true);
      if (audioStop) audioStop();
      updErrCounts(errCounts + 1);
      if (errCounts == 5) {
        updErrCounts(0);
        updateCaptchaToken(false);
        updateCaptchaIsActive(false);
      }
    }
  }
  return /*#__PURE__*/React.createElement("input", {
    ref: captchaInpRef,
    onKeyUp: event => {
      if (event.key == 'Enter') {
        captchaInpRef.current.value = '';
        submitValue();
      }
    },
    onChange: () => updateCaptchaValue(captchaInpRef.current.value),
    className: isDesktop ? styles$1.captchaInputDesktop : styles$1.captchaInputPortrait,
    placeholder: "\u0412\u0430\u0448 \u043E\u0442\u0432\u0435\u0442"
  });
}

var styles$2 = {"captchaSubmitBttn":"_captchaSubmitBttn__captchaSubmitBttn__39UTC","captchaSubmitBttnDesktop":"_captchaSubmitBttn__captchaSubmitBttnDesktop__2BWKq","captchaSubmitBttnPortrait":"_captchaSubmitBttn__captchaSubmitBttnPortrait__3N5Ge","noselect":"_captchaSubmitBttn__noselect__aMDFu"};

function CaptchaSubmitBttn({
  isDesktop,
  captchaValue,
  cbm,
  captchaIDs,
  updateCaptchaToken,
  updateCaptchaIsActive,
  updateCaptchaData,
  inputRef,
  audioStop,
  updErrCounts,
  errCounts,
  captchaIndex,
  updateActiveStates,
  captchaType,
  updateCaptchaIndex
}) {
  async function submitValue() {
    if (inputRef) inputRef.current.value = '';
    try {
      if (updateActiveStates) {
        updateActiveStates([false, false, false, false, false, false, false, false, false]);
      }
      const answer = await cbm.checkCaptcha({
        code: captchaValue,
        captchaIDs: captchaIDs,
        index: captchaIndex,
        type: captchaType
      });
      if (answer) {
        updateCaptchaToken(answer.captchaToken);
        updateCaptchaIsActive(false);
        if (audioStop) audioStop();
      }
    } catch (err) {
      updateCaptchaData(true);
      if (updateCaptchaIndex) updateCaptchaIndex(1);
      if (audioStop) audioStop();
      updErrCounts(errCounts + 1);
      if (errCounts == 5) {
        updErrCounts(0);
        updateCaptchaToken(false);
        updateCaptchaIsActive(false);
      }
    }
  }
  return /*#__PURE__*/React.createElement("button", {
    onClick: submitValue,
    className: isDesktop ? styles$2.captchaSubmitBttnDesktop + ' ' + styles$2.captchaSubmitBttn + ' ' + styles$2.noselect : styles$2.captchaSubmitBttnPortrait + ' ' + styles$2.captchaSubmitBttn + ' ' + styles$2.noselect
  }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C");
}

var styles$3 = {"updateCaptchaBttnDesktop":"_updateCaptchaBttn__updateCaptchaBttnDesktop__rG2YZ","updateCaptchaBttnPortrait":"_updateCaptchaBttn__updateCaptchaBttnPortrait__3VOLc"};

function UpdateCaptchaBttn({
  updateCaptchaData,
  isDesktop,
  audioStop,
  updateCaptchaToken,
  updateCaptchaIsActive,
  updateCaptchaIndex
}) {
  const [rerunCounts, updateRerunCounts] = useState(0);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    onClick: () => {
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

function TextCaptcha({
  cbm,
  updateCaptchaIsActive,
  updateInputRef,
  inputRef,
  isDesktop,
  captchaValue,
  updateCaptchaValue,
  updateCaptchaToken,
  captchaIsActive,
  captchaType
}) {
  var _captchas$captchaInde, _captchas$captchaInde2, _captchas$captchaInde3;
  const [errCounts, updErrCounts] = useState(0);
  const [captchas, updateCaptchas] = useState('');
  const [captchaIndex, updateCaptchaIndex] = useState(0);
  useEffect(() => {
    updateCaptchaData();
    updateCaptchaToken(false);
  }, []);
  async function updateCaptchaData() {
    if (captchaIsActive) {
      const answer = await cbm.getCaptcha('TEXT');
      if (answer) {
        updateCaptchas(answer.captchas);
      }
    }
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    className: styles$4.captchaImg,
    src: (_captchas$captchaInde = captchas[captchaIndex]) === null || _captchas$captchaInde === void 0 ? void 0 : _captchas$captchaInde.body
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CaptchaSlider, {
    isDesktop: isDesktop,
    updateCaptchaData: updateCaptchaData,
    captchas: captchas,
    updateCaptchaIndex: updateCaptchaIndex
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$4.captchaBttnsContainer
  }, /*#__PURE__*/React.createElement(UpdateCaptchaBttn, {
    updateCaptchaIndex: updateCaptchaIndex,
    updateCaptchaData: updateCaptchaData,
    isDesktop: isDesktop,
    updateCaptchaIsActive: updateCaptchaIsActive,
    updateCaptchaToken: updateCaptchaToken
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$4.unswerContainer
  }, /*#__PURE__*/React.createElement(CaptchaInput, {
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
  }), /*#__PURE__*/React.createElement(CaptchaSubmitBttn, {
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

const CONFIG = {
  BACKEND_API: `https://captcha.sixhands.co`
};

class CaptchaBaseModule {
  async postRequest(request, props = null, headers) {
    try {
      const response = await axios.post(`${CONFIG.BACKEND_API}/${request}`, props);
      return response.data;
    } catch (error) {
      throw new Error(`Error getting data from API: ${error.message}`);
    }
  }
  async getRequest(request, props = null) {
    try {
      const response = await axios.get(`${CONFIG.BACKEND_API}/${request}`, props);
      return response.data;
    } catch (error) {
      throw new Error(`Error getting data from API: ${error.message}`);
    }
  }
  async getCaptcha(type) {
    const answer = await this.postRequest(`captchas`, {
      type: type
    });
    if (answer) return answer;
  }
  async getServerStatus() {
    const answer = await this.getRequest(`health`);
    if (answer) return answer;
  }
  async checkCaptcha(req) {
    let answer = null;
    if (req.index) answer = await this.postRequest(`captchas/check`, req, true);else answer = await this.postRequest(`captchas/check`, req, true);
    if (answer) return answer;
  }
}

var styles$5 = {"captchaOuter":"_captchaManager__captchaOuter__Zog3a","captchaContainerDesktop":"_captchaManager__captchaContainerDesktop__spLe0","captchaContainerPortrait":"_captchaManager__captchaContainerPortrait__2eL_P"};

var styles$6 = {"captchaStatusNotificationdDesktop":"_deadCaptcha__captchaStatusNotificationdDesktop__11lxd","captchaStatusNotificationdPortrait":"_deadCaptcha__captchaStatusNotificationdPortrait__2tGCF","serverStatus":"_deadCaptcha__serverStatus__1ZhLj"};

function DeadCaptcha({
  isDesktop
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: styles$6.serverStatus
  }), /*#__PURE__*/React.createElement("span", {
    className: isDesktop ? styles$6.captchaStatusNotificationdDesktop : styles$6.captchaStatusNotificationdPortrait
  }, "\u0421\u0435\u0440\u0432\u0435\u0440 \u0441\u043F\u0438\u0442"));
}

var styles$7 = {"captachaExitContainer":"_captchaExitBttn__captachaExitContainer__udUOg","captchaExitBttnPortrait":"_captchaExitBttn__captchaExitBttnPortrait__1C6EM","captchaExitBttnDesktop":"_captchaExitBttn__captchaExitBttnDesktop__hm3KP","noselect":"_captchaExitBttn__noselect__3tM8X"};

function CaptchaExitBttn({
  isDesktop,
  updateCaptchaIsActive
}) {
  function leftCaptchaContainer() {
    updateCaptchaIsActive(false);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: styles$7.captachaExitContainer + ' ' + styles$7.noselect
  }, /*#__PURE__*/React.createElement("img", {
    onClick: leftCaptchaContainer,
    className: isDesktop ? styles$7.captchaExitBttnDesktop : styles$7.captchaExitBttnPortrait
  }));
}

var styles$8 = {"captchaImg":"_mathCaptcha__captchaImg__qj6tz","captchaBttnsContainer":"_mathCaptcha__captchaBttnsContainer__2akf9","unswerContainer":"_mathCaptcha__unswerContainer__RSRiR"};

function TextCaptcha$1({
  cbm,
  updateCaptchaIsActive,
  updateInputRef,
  inputRef,
  isDesktop,
  captchaValue,
  updateCaptchaValue,
  updateCaptchaToken,
  captchaType
}) {
  var _captchas$captchaInde, _captchas$captchaInde2, _captchas$captchaInde3;
  const [errCounts, updErrCounts] = useState(0);
  const [captchas, updateCaptchas] = useState('');
  const [captchaIndex, updateCaptchaIndex] = useState(0);
  useEffect(() => {
    updateCaptchaData();
    updateCaptchaToken(false);
  }, []);
  async function updateCaptchaData() {
    const answer = await cbm.getCaptcha('MATH');
    if (answer) {
      updateCaptchas(answer.captchas);
    }
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    className: styles$8.captchaImg,
    src: (_captchas$captchaInde = captchas[captchaIndex]) === null || _captchas$captchaInde === void 0 ? void 0 : _captchas$captchaInde.body
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CaptchaSlider, {
    isDesktop: isDesktop,
    updateCaptchaData: updateCaptchaData,
    updateCaptchaIndex: updateCaptchaIndex,
    captchas: captchas
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$8.captchaBttnsContainer
  }, /*#__PURE__*/React.createElement(UpdateCaptchaBttn, {
    updateCaptchaIndex: updateCaptchaIndex,
    updateCaptchaData: updateCaptchaData,
    isDesktop: isDesktop,
    updateCaptchaIsActive: updateCaptchaIsActive,
    updateCaptchaToken: updateCaptchaToken
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$8.unswerContainer
  }, /*#__PURE__*/React.createElement(CaptchaInput, {
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
  }), /*#__PURE__*/React.createElement(CaptchaSubmitBttn, {
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

function CaptchaToSpeech({
  audioPlay,
  isDesktop
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: isDesktop ? styles$a.captchaToSpeechBttnDesktop : styles$a.captchaToSpeechBttnPortrait,
    onClick: () => audioPlay()
  });
}

function AudioCaptcha({
  cbm,
  updateCaptchaIsActive,
  updateInputRef,
  inputRef,
  isDesktop,
  captchaValue,
  updateCaptchaValue,
  updateCaptchaToken,
  captchaType
}) {
  const [captchas, updateCaptchas] = useState('');
  const [noticeIsActive, updateNoticeState] = useState(false);
  const [errCounts, updErrCounts] = useState(0);
  const audioPlayer = useRef();
  useEffect(() => {
    updateCaptchaData();
    updateCaptchaToken(false);
  }, []);
  async function updateCaptchaData(isUpd) {
    const answer = await cbm.getCaptcha('AUDIO');
    if (answer) {
      updateCaptchas(answer.captchas[0]);
      if (isUpd) {
        if (!noticeIsActive) {
          updateNoticeState(true);
          setTimeout(() => updateNoticeState(false), 1000);
        }
      }
    }
  }
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
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("audio", {
    src: captchas.body,
    ref: audioPlayer
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$9.captchaBttnsContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$9.captchaBttn
  }, /*#__PURE__*/React.createElement(UpdateCaptchaBttn, {
    isDesktop: isDesktop,
    audioPlayer: audioPlayer,
    updateCaptchaData: updateCaptchaData,
    audioStop: audioStop
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$9.captchaBttn + ' ' + styles$9.captchaSpeechBttn
  }, /*#__PURE__*/React.createElement(CaptchaToSpeech, {
    audioPlay: audioPlay,
    isDesktop: isDesktop
  }))), /*#__PURE__*/React.createElement("span", {
    className: isDesktop ? styles$9.updNoticeDesk : styles$9.updNoticePort
  }, noticeIsActive ? 'Капча успешно обновлена!' : 'Прослушайте капчу'), /*#__PURE__*/React.createElement("div", {
    className: styles$9.unswerContainer
  }, /*#__PURE__*/React.createElement(CaptchaInput, {
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
  }), /*#__PURE__*/React.createElement(CaptchaSubmitBttn, {
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

function GraphCaptcha({
  cbm,
  updateCaptchaIsActive,
  updateInputRef,
  inputRef,
  isDesktop,
  captchaValue,
  updateCaptchaValue,
  updateCaptchaToken,
  captchaType
}) {
  const [errCounts, updErrCounts] = useState(0);
  const [captchas, updateCaptchas] = useState([]);
  const [captchaIndex, updateCaptchaIndex] = useState(0);
  const [activeCaptchasIndex, updActiveCapthasIndex] = useState([]);
  const [activeCaptchas, updActiveCapthas] = useState([]);
  const [activeStates, updateActiveStates] = useState([false, false, false, false, false, false, false, false, false]);
  const [noticeIsActive, updateNoticeState] = useState(true);
  useEffect(() => {
    updateCaptchaData();
    updateCaptchaToken(false);
  }, []);
  async function updateCaptchaData(isUpd) {
    updateNoticeState(true);
    updActiveCapthas([]);
    const answer = await cbm.getCaptcha('GRAPH');
    if (answer) {
      updateCaptchas(answer.captchas);
      updateNoticeState(false);
    }
  }
  function changeCaptchaState(index) {
    const indexCaptcha = activeCaptchasIndex.indexOf(index);
    const newActiveStates = [...activeStates];
    if (indexCaptcha >= 0) {
      updActiveCapthasIndex([...activeCaptchasIndex].filter(function (elem) {
        return elem !== index;
      }));
      updActiveCapthas([...activeCaptchas].filter((item, i) => {
        return captchas[index].captchaID !== item;
      }));
      newActiveStates[index] = false;
      updateActiveStates(newActiveStates);
    } else {
      updActiveCapthasIndex([...activeCaptchasIndex, index]);
      updActiveCapthas([...activeCaptchas, captchas[index].captchaID]);
      newActiveStates[index] = true;
      updateActiveStates(newActiveStates);
    }
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: styles$b.container
  }, /*#__PURE__*/React.createElement("div", {
    className: isDesktop ? styles$b.captchaContainer + ' ' + styles$b.gripGadDesktop : styles$b.captchaContainer + ' ' + styles$b.gripGadPortrait
  }, captchas.map((captcha, index) => /*#__PURE__*/React.createElement("div", {
    onClick: () => {
      changeCaptchaState(index);
    },
    key: index,
    className: isDesktop ? styles$b.captchaDesktop + ' ' + (activeStates[index] ? styles$b.elemActiveDesktop : '') : styles$b.captchaPortrait + ' ' + (activeStates[index] ? styles$b.elemActivePortrait : ''),
    style: {
      content: `url(${captcha === null || captcha === void 0 ? void 0 : captcha.body})`
    }
  })))), /*#__PURE__*/React.createElement("p", {
    className: isDesktop ? styles$b.updNoticeDesk : styles$b.updNoticePort
  }, noticeIsActive ? 'Получаем новую капчу...' : 'Выберите все одинаковые изображения'), /*#__PURE__*/React.createElement("div", {
    className: styles$b.captchaBttnsContainer
  }, /*#__PURE__*/React.createElement(UpdateCaptchaBttn, {
    updateCaptchaIndex: updateCaptchaIndex,
    updateCaptchaData: updateCaptchaData,
    isDesktop: isDesktop,
    updateCaptchaIsActive: updateCaptchaIsActive,
    updateCaptchaToken: updateCaptchaToken
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$b.unswerContainer
  }, /*#__PURE__*/React.createElement(CaptchaSubmitBttn, {
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

function AnimeCaptcha({
  cbm,
  updateCaptchaIsActive,
  updateInputRef,
  inputRef,
  isDesktop,
  captchaValue,
  updateCaptchaValue,
  updateCaptchaToken,
  captchaType
}) {
  var _captchas$captchaInde, _captchas$captchaInde2;
  const [errCounts, updErrCounts] = useState(0);
  const [captchas, updateCaptchas] = useState([]);
  const [standard, updStandard] = useState({});
  const [captchaIndex, updateCaptchaIndex] = useState(1);
  const [noticeIsActive, updateNoticeState] = useState(true);
  useEffect(() => {
    updateCaptchaData();
    updateCaptchaToken(false);
  }, []);
  async function updateCaptchaData(isUpd) {
    updateNoticeState(true);
    const answer = await cbm.getCaptcha('ANIME');
    if (answer) {
      updateCaptchas(answer.captchas);
      updStandard(answer.captchas[0]);
      updateNoticeState(false);
    }
  }
  const switchImage = state => {
    let index = captchaIndex + state;
    if (index < 1) index = captchas.length - 1;else if (index > captchas.length - 1) index = 1;
    updateCaptchaIndex(index);
  };
  return /*#__PURE__*/React.createElement("div", null, !noticeIsActive && /*#__PURE__*/React.createElement("div", {
    className: styles$c.container + ' ' + styles$c.noselect
  }, /*#__PURE__*/React.createElement("div", {
    className: isDesktop ? styles$c.captchaContainer + ' ' + styles$c.gripGadDesktop : styles$c.captchaContainer + ' ' + styles$c.gripGadPortrait
  }, /*#__PURE__*/React.createElement("div", {
    className: isDesktop ? styles$c.captchaDesktop : styles$c.captchaPortrait,
    style: {
      content: `url(${standard === null || standard === void 0 ? void 0 : standard.body})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: isDesktop ? styles$c.captchaDesktop : styles$c.captchaPortrait,
    style: {
      background: `url(${(_captchas$captchaInde = captchas[captchaIndex]) === null || _captchas$captchaInde === void 0 ? void 0 : _captchas$captchaInde.body}) no-repeat center center / cover`
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => switchImage(-1),
    className: isDesktop ? styles$c.switchButtonDesktop + ' ' + styles$c.leftButtonDesktop : styles$c.switchButtonPortrait + ' ' + styles$c.leftButtonPortrait
  }), /*#__PURE__*/React.createElement("div", {
    onClick: () => switchImage(1),
    className: isDesktop ? styles$c.switchButtonDesktop + ' ' + styles$c.rightButtonDesktop : styles$c.switchButtonPortrait + ' ' + styles$c.rightButtonPortrait
  })))), /*#__PURE__*/React.createElement("p", {
    className: isDesktop ? styles$c.updNoticeDesk + ' ' + styles$c.noselect : styles$c.updNoticePort + ' ' + styles$c.noselect
  }, noticeIsActive ? 'Получаем новую капчу...' : 'Приведите в одинаковое положение'), /*#__PURE__*/React.createElement("div", {
    className: styles$c.captchaBttnsContainer + ' ' + styles$c.noselect
  }, /*#__PURE__*/React.createElement(UpdateCaptchaBttn, {
    updateCaptchaIndex: updateCaptchaIndex,
    updateCaptchaData: updateCaptchaData,
    isDesktop: isDesktop,
    updateCaptchaIsActive: updateCaptchaIsActive,
    updateCaptchaToken: updateCaptchaToken
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$c.unswerContainer + ' ' + styles$c.noselect
  }, /*#__PURE__*/React.createElement(CaptchaSubmitBttn, {
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

function CaptchaManager({
  updateCaptchaIsActive,
  captchaIsActive,
  updateCaptchaToken,
  captchaType
}) {
  function screenStatus() {
    return window.innerWidth > window.innerHeight ? true : false;
  }
  const cbm = new CaptchaBaseModule();
  const [isDesktop, updateIsDesktop] = useState(screenStatus());
  const [captchaValue, updateCaptchaValue] = useState('');
  const [inputRef, updateInputRef] = useState(null);
  const [serverIsLiving, updateServerStatus] = useState(false);
  useEffect(() => {
    async function fetchObj() {
      const answer = await cbm.getServerStatus();
      if (answer) {
        updateServerStatus(true);
      }
    }
    fetchObj();
  }, []);
  window.onresize = function () {
    updateIsDesktop(screenStatus());
  };
  return /*#__PURE__*/React.createElement("div", null, " ", captchaIsActive ? /*#__PURE__*/React.createElement("div", {
    className: styles$5.captchaOuter
  }, /*#__PURE__*/React.createElement("div", {
    className: isDesktop ? styles$5.captchaContainerDesktop : styles$5.captchaContainerPortrait
  }, /*#__PURE__*/React.createElement(CaptchaExitBttn, {
    isDesktop: isDesktop,
    updateCaptchaIsActive: updateCaptchaIsActive
  }), serverIsLiving ? captchaType === 'TEXT' ? /*#__PURE__*/React.createElement(TextCaptcha, {
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
  }) : captchaType === 'MATH' ? /*#__PURE__*/React.createElement(TextCaptcha$1, {
    updateCaptchaIsActive: updateCaptchaIsActive,
    isDesktop: isDesktop,
    captchaValue: captchaValue,
    updateCaptchaValue: updateCaptchaValue,
    updateCaptchaToken: updateCaptchaToken,
    inputRef: inputRef,
    updateInputRef: updateInputRef,
    cbm: cbm,
    captchaType: captchaType
  }) : captchaType === 'AUDIO' ? /*#__PURE__*/React.createElement(AudioCaptcha, {
    updateCaptchaIsActive: updateCaptchaIsActive,
    isDesktop: isDesktop,
    captchaValue: captchaValue,
    updateCaptchaValue: updateCaptchaValue,
    updateCaptchaToken: updateCaptchaToken,
    inputRef: inputRef,
    updateInputRef: updateInputRef,
    cbm: cbm,
    captchaType: captchaType
  }) : captchaType === 'GRAPH' ? /*#__PURE__*/React.createElement(GraphCaptcha, {
    updateCaptchaIsActive: updateCaptchaIsActive,
    isDesktop: isDesktop,
    captchaValue: captchaValue,
    updateCaptchaValue: updateCaptchaValue,
    updateCaptchaToken: updateCaptchaToken,
    inputRef: inputRef,
    updateInputRef: updateInputRef,
    cbm: cbm,
    captchaType: captchaType
  }) : captchaType === 'ANIME' ? /*#__PURE__*/React.createElement(AnimeCaptcha, {
    updateCaptchaIsActive: updateCaptchaIsActive,
    isDesktop: isDesktop,
    captchaValue: captchaValue,
    updateCaptchaValue: updateCaptchaValue,
    updateCaptchaToken: updateCaptchaToken,
    inputRef: inputRef,
    updateInputRef: updateInputRef,
    cbm: cbm,
    captchaType: captchaType
  }) : /*#__PURE__*/React.createElement(Fragment, null) : /*#__PURE__*/React.createElement(DeadCaptcha, {
    isDesktop: isDesktop
  }))) : /*#__PURE__*/React.createElement(Fragment, null));
}

export { CaptchaManager, CaptchaProps };
//# sourceMappingURL=index.modern.js.map
