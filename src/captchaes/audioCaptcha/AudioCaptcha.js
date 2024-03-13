import { useEffect, useRef, useState } from 'react';
import React from 'react'

import styles from './audioCaptcha.css';
import CaptchaInput from '../../components/captchaInput/CaptchaInput';
import CaptchaSubmitBttn from '../../components/captchaSubmitBttn/CaptchaSubmitBttn';
import CaptchaToSpeech from '../../components/captchaToSpeech/CaptchaToSpeech';
import UpdateCaptchaBttn from '../../components/updateCaptchaBttn/UpdateCaptchaBttn';

export default function AudioCaptcha({ cbm, updateCaptchaIsActive, updateInputRef,
    inputRef, isDesktop, captchaValue, updateCaptchaValue, updateCaptchaToken,
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
                    setTimeout(() => updateNoticeState(false), 1000)
                }
            }
        }
    }

    function audioStop() {
        if (audioPlayer?.current) {
            audioPlayer.current.pause();
            audioPlayer.current.currentTime = 0;
        }


    }

    function audioPlay() {
        if (audioPlayer?.current) {
            audioPlayer.current.play();
        }
    }

    return (
        <div >
            <audio
                src={captchas.body}
                ref={audioPlayer}
            // onTimeUpdate={onPlaying}
            ></audio>
            <div className={styles.captchaBttnsContainer}>
                <div className={styles.captchaBttn}>
                    <UpdateCaptchaBttn
                        isDesktop={isDesktop}
                        audioPlayer={audioPlayer}
                        updateCaptchaData={updateCaptchaData}
                        audioStop={audioStop}
                    />
                </div>
                <div className={styles.captchaBttn + ' ' + styles.captchaSpeechBttn}>
                    <CaptchaToSpeech audioPlay={audioPlay} isDesktop={isDesktop} />
                </div>
            </div>
            <span className={isDesktop ? styles.updNoticeDesk
                : styles.updNoticePort}>{noticeIsActive ? 'Капча успешно обновлена!' : 'Прослушайте капчу'}</span>
            <div className={styles.unswerContainer}>
                <CaptchaInput isDesktop={isDesktop} updateCaptchaValue={updateCaptchaValue}
                    cbm={cbm} captchaIDs={[captchas?.captchaID]}
                    updateCaptchaIsActive={updateCaptchaIsActive}
                    updateCaptchaData={updateCaptchaData}
                    updateCaptchaToken={updateCaptchaToken}
                    updateInputRef={updateInputRef}
                    updErrCounts={updErrCounts}
                    errCounts={errCounts}
                    audioStop={audioStop}
                    captchaType={captchaType}
                    captchaValue={captchaValue}
                />
                <CaptchaSubmitBttn isDesktop={isDesktop} captchaValue={captchaValue}
                    cbm={cbm} captchaIDs={[captchas?.captchaID]}
                    updateCaptchaIsActive={updateCaptchaIsActive}
                    updateCaptchaData={updateCaptchaData}
                    updateCaptchaToken={updateCaptchaToken}
                    inputRef={inputRef}
                    updErrCounts={updErrCounts}
                    errCounts={errCounts}
                    audioStop={audioStop}
                />
            </div>

        </div>
    );
}
