import { useEffect, useState } from 'react';
import React from 'react'

import CaptchaSlider from '../../components/slider/CaptchaSlider';
import CaptchaInput from '../../components/captchaInput/CaptchaInput';
import CaptchaSubmitBttn from '../../components/captchaSubmitBttn/CaptchaSubmitBttn';
import UpdateCaptchaBttn from '../../components/updateCaptchaBttn/UpdateCaptchaBttn';

import styles from './mathCaptcha.css';

export default function MathCaptcha({ cbm, updateCaptchaIsActive, updateInputRef,
    inputRef, isDesktop, captchaValue, updateCaptchaValue, updateCaptchaToken, }) {

    const [imgSrc, updateCaptchas] = useState('');
    const [captchaID, updateCaptchaID] = useState('');

    useEffect(() => {
        updateCaptchaData();
        updateCaptchaToken(false);
    }, []);

    async function updateCaptchaData() {
        const answer = await cbm.getCaptcha('MATH');
        if (answer) {
            updateCaptchas(answer.captchas[0]);
            updateCaptchaID(answer.captchaID);
        }
    }

    return (
        <div >
            <img
                className={styles.captchaImg}
                src={imgSrc}
    
            />
            <div >
                <CaptchaSlider isDesktop={isDesktop} 
                    updateCaptchaData={updateCaptchaData} />
            </div>
            <div className={styles.captchaBttnsContainer}>
                <UpdateCaptchaBttn
                    updateBlurLvl={updateBlurLvl} updateCaptchaData={updateCaptchaData}
                    isDesktop={isDesktop}
                />
            </div>
            <div className={styles.unswerContainer}>
                <CaptchaInput isDesktop={isDesktop} updateCaptchaValue={updateCaptchaValue}
                    cbm={cbm} captchaID={captchaID}
                    updateCaptchaIsActive={updateCaptchaIsActive}
                    updateCaptchaData={updateCaptchaData}
                    updateCaptchaToken={updateCaptchaToken}
                    updateInputRef={updateInputRef} />
                <CaptchaSubmitBttn isDesktop={isDesktop} captchaValue={captchaValue}
                    cbm={cbm} captchaID={captchaID}
                    updateCaptchaIsActive={updateCaptchaIsActive}
                    updateCaptchaData={updateCaptchaData}
                    updateCaptchaToken={updateCaptchaToken}
                    inputRef={inputRef}
                />
            </div>

        </div>
    );
}
