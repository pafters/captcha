import { useState, useEffect } from "react";
import React, { Fragment } from "react";

import TextCaptcha from "../../captchaes/textCaptcha/TextCaptcha";
import CaptchaBaseModule from "../../modules/CaptchaBaseModule";

import styles from './captchaManager.css';
import DeadCaptcha from "../../captchaes/deadCaptcha/DeadCaptcha";

import CaptchaExitBttn from "../captchaExitBttn/CaptchaExitBttn";
import MathCaptcha from "../../captchaes/mathCaptcha/MathCaptcha";
import AudioCaptcha from "../../captchaes/audioCaptcha/AudioCaptcha";
import GraphCaptcha from "../../captchaes/graphCaptcha/GraphCaptcha";
import AnimeCaptcha from "../../captchaes/animeCaptcha/AnimeCaptcha";


export { TextCaptcha, DeadCaptcha, MathCaptcha, AudioCaptcha }


export default function CaptchaManager({ updateCaptchaIsActive, captchaIsActive, updateCaptchaToken, captchaType }) {
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
                // updateServerStatus(answer.ok);
                updateServerStatus(true);
            }
        }
        fetchObj();
    }, []);

    window.onresize = function () {
        updateIsDesktop(screenStatus());
    };

    return (
        <div> {
            captchaIsActive ?
                <div className={styles.captchaOuter}>
                    <div className={isDesktop ? styles.captchaContainerDesktop : styles.captchaContainerPortrait}>
                        <CaptchaExitBttn isDesktop={isDesktop} updateCaptchaIsActive={updateCaptchaIsActive} />
                        {serverIsLiving ? captchaType === 'TEXT' ? <TextCaptcha
                            updateCaptchaIsActive={updateCaptchaIsActive}
                            isDesktop={isDesktop}
                            captchaValue={captchaValue}
                            updateCaptchaValue={updateCaptchaValue}
                            updateCaptchaToken={updateCaptchaToken}
                            inputRef={inputRef}
                            updateInputRef={updateInputRef}
                            cbm={cbm}
                            captchaType={captchaType}
                            captchaIsActive={captchaIsActive}
                        />
                            : captchaType === 'MATH' ?
                                <MathCaptcha updateCaptchaIsActive={updateCaptchaIsActive}
                                    isDesktop={isDesktop}
                                    captchaValue={captchaValue}
                                    updateCaptchaValue={updateCaptchaValue}
                                    updateCaptchaToken={updateCaptchaToken}
                                    inputRef={inputRef}
                                    updateInputRef={updateInputRef}
                                    cbm={cbm}
                                    captchaType={captchaType}

                                />
                                : captchaType === 'AUDIO' ?
                                    <AudioCaptcha updateCaptchaIsActive={updateCaptchaIsActive}
                                        isDesktop={isDesktop}
                                        captchaValue={captchaValue}
                                        updateCaptchaValue={updateCaptchaValue}
                                        updateCaptchaToken={updateCaptchaToken}
                                        inputRef={inputRef}
                                        updateInputRef={updateInputRef}
                                        cbm={cbm}
                                        captchaType={captchaType}
                                    />
                                    : captchaType === 'GRAPH' ?
                                        <GraphCaptcha
                                            updateCaptchaIsActive={updateCaptchaIsActive}
                                            isDesktop={isDesktop}
                                            captchaValue={captchaValue}
                                            updateCaptchaValue={updateCaptchaValue}
                                            updateCaptchaToken={updateCaptchaToken}
                                            inputRef={inputRef}
                                            updateInputRef={updateInputRef}
                                            cbm={cbm}
                                            captchaType={captchaType}
                                        /> :
                                        captchaType === 'ANIME' ?
                                            <AnimeCaptcha
                                                updateCaptchaIsActive={updateCaptchaIsActive}
                                                isDesktop={isDesktop}
                                                captchaValue={captchaValue}
                                                updateCaptchaValue={updateCaptchaValue}
                                                updateCaptchaToken={updateCaptchaToken}
                                                inputRef={inputRef}
                                                updateInputRef={updateInputRef}
                                                cbm={cbm}
                                                captchaType={captchaType}
                                            /> :
                                            <Fragment />
                            : <DeadCaptcha isDesktop={isDesktop} />}
                    </div>
                </div> : <Fragment />
        }
        </div>
    );
}