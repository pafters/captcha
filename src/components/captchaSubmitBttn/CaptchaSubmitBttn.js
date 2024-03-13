
import styles from './captchaSubmitBttn.css';
import React from 'react';

export default function CaptchaSubmitBttn({ isDesktop, captchaValue, cbm,
    captchaIDs, updateCaptchaToken, updateCaptchaIsActive, updateCaptchaData, inputRef,
    audioStop, updErrCounts, errCounts, captchaIndex, updateActiveStates, captchaType,
    updateCaptchaIndex }) {

    async function submitValue() {
        if (inputRef)
            inputRef.current.value = '';
        try {
            if (updateActiveStates) {
                updateActiveStates([
                    false, false, false,
                    false, false, false,
                    false, false, false,
                ])
            }
            const answer = await cbm.checkCaptcha({ code: captchaValue, captchaIDs: captchaIDs, index: captchaIndex, type: captchaType });
            if (answer) {
                updateCaptchaToken(answer.captchaToken);
                updateCaptchaIsActive(false);
                if (audioStop)
                    audioStop();
            }
        } catch (err) {
            updateCaptchaData(true);
            if (updateCaptchaIndex)
                updateCaptchaIndex(1)
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
        <button onClick={submitValue} className={isDesktop ? styles.captchaSubmitBttnDesktop + ' ' + styles.captchaSubmitBttn + ' ' + styles.noselect
            : styles.captchaSubmitBttnPortrait + ' ' + styles.captchaSubmitBttn + ' ' + styles.noselect}>Отправить</button>
    );
}