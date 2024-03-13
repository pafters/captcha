import { useEffect, useState } from 'react';
import React from 'react'

import CaptchaSlider from '../../components/slider/CaptchaSlider';
import CaptchaInput from '../../components/captchaInput/CaptchaInput';
import CaptchaSubmitBttn from '../../components/captchaSubmitBttn/CaptchaSubmitBttn';
import UpdateCaptchaBttn from '../../components/updateCaptchaBttn/UpdateCaptchaBttn';

import styles from './mathCaptcha.css';

export default function TextCaptcha({ cbm, updateCaptchaIsActive, updateInputRef,
    inputRef, isDesktop, captchaValue, updateCaptchaValue, updateCaptchaToken,
    captchaType
}) {
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

    return (
        <div >
            <img
                className={styles.captchaImg}
                src={captchas[captchaIndex]?.body}
            />
            <div >
                <CaptchaSlider isDesktop={isDesktop}
                    updateCaptchaData={updateCaptchaData}
                    updateCaptchaIndex={updateCaptchaIndex}
                    captchas={captchas} />

            </div>
            <div className={styles.captchaBttnsContainer}>
                <UpdateCaptchaBttn
                    updateCaptchaIndex={updateCaptchaIndex} updateCaptchaData={updateCaptchaData}
                    isDesktop={isDesktop}
                    updateCaptchaIsActive={updateCaptchaIsActive}
                    updateCaptchaToken={updateCaptchaToken}
                />
            </div>
            <div className={styles.unswerContainer}>
                <CaptchaInput isDesktop={isDesktop} updateCaptchaValue={updateCaptchaValue}
                    cbm={cbm} captchaIDs={[captchas[captchaIndex]?.captchaID]}
                    updateCaptchaIsActive={updateCaptchaIsActive}
                    updateCaptchaData={updateCaptchaData}
                    updateCaptchaToken={updateCaptchaToken}
                    updateInputRef={updateInputRef}
                    updateCaptchaIndex={updateCaptchaIndex}
                    captchaValue={captchaValue}
                    captchaIndex={captchaIndex}
                    updErrCounts={updErrCounts}
                    errCounts={errCounts}
                    captchaType={captchaType}
                />
                <CaptchaSubmitBttn isDesktop={isDesktop} captchaValue={captchaValue}
                    cbm={cbm} captchaIDs={[captchas[captchaIndex]?.captchaID]}
                    updateCaptchaIsActive={updateCaptchaIsActive}
                    updateCaptchaData={updateCaptchaData}
                    updateCaptchaToken={updateCaptchaToken}
                    updateCaptchaIndex={updateCaptchaIndex}
                    inputRef={inputRef}
                    captchaIndex={captchaIndex}
                    updErrCounts={updErrCounts}
                    errCounts={errCounts}
                    captchaType={captchaType}
                />
            </div>

        </div>
    );
}
