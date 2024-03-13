import React, { useState } from 'react';
import './index.css';

import { CaptchaManager, CaptchaProps } from 'captcha-react-library/'
import 'captcha-react-library/dist/index.css';

const App = () => {
  const [captchaType, updateCaptchaType] = useState('');

  const { captchaIsActive, updateCaptchaIsActive, captchaToken, updateCaptchaToken } = CaptchaProps();

  function showCaptcha(captchaType) {
    updateCaptchaIsActive(true);
    updateCaptchaType(captchaType);
  }

  return (
    <div>
      <div className='authContainer'>
        <div className='authInnerContainer'>
          <br />
          <span>{!captchaToken ? '' : 'Верификация успешно пройдена!'}</span>
          <div className='buttonContainer'>
            <button onClick={() => { showCaptcha('TEXT'); }}>Текстовая</button>
            <button onClick={() => { showCaptcha('MATH'); }}>Математическая</button>
            <button onClick={() => { showCaptcha('AUDIO'); }}>Аудио</button>
            <button onClick={() => { showCaptcha('GRAPH'); }}>Графическая</button>
            <button onClick={() => { showCaptcha('ANIME'); }}>Анимационная</button>
          </div>
        </div>
      </div>
      <CaptchaManager captchaIsActive={captchaIsActive}
        updateCaptchaIsActive={updateCaptchaIsActive}
        updateCaptchaToken={updateCaptchaToken}
        captchaType={captchaType} />
    </div >
  )
}

export default App
