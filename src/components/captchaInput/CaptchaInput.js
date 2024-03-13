import { useEffect, useRef } from 'react';
import React from 'react';

import styles from './captchaInput.css';

export default function CaptchaInput({ isDesktop, cbm, updateCaptchaValue, updateCaptchaToken,
    updateInputRef, captchaIDs, captchaValue,
    updateCaptchaIsActive, updateCaptchaData, audioStop, updErrCounts, errCounts, captchaIndex,
    captchaType }) {
    const captchaInpRef = useRef();

    useEffect(() => {
        updateInputRef(captchaInpRef);
    }, [])

    async function submitValue() {
        try {
            const answer = await cbm.checkCaptcha({ code: captchaValue, captchaIDs: captchaIDs, index: captchaIndex, type: captchaType });
            if (answer) {
                updateCaptchaToken(answer.captchaToken);
                updateCaptchaIsActive(false);
                if (audioStop)
                    audioStop();
            }
        } catch (err) {
            updateCaptchaData(true);
            if (audioStop)
                audioStop();
            updErrCounts(errCounts + 1);
            if (errCounts == 5) {
                updErrCounts(0);
                updateCaptchaToken(false);
                updateCaptchaIsActive(false);
            }
        }
    }

    return (
        <input ref={captchaInpRef} onKeyUp={(event) => {
            if (event.key == 'Enter') {
                captchaInpRef.current.value = '';
                submitValue();
            }
        }} onChange={() => updateCaptchaValue(captchaInpRef.current.value)}
            className={isDesktop ? styles.captchaInputDesktop : styles.captchaInputPortrait} placeholder="Ваш ответ" />
    );
}