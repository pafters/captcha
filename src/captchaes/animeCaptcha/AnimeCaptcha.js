import { useEffect, useState, createRef } from 'react';
import React from 'react'

import CaptchaSubmitBttn from '../../components/captchaSubmitBttn/CaptchaSubmitBttn';
import UpdateCaptchaBttn from '../../components/updateCaptchaBttn/UpdateCaptchaBttn';

import styles from './animeCaptcha.css';

export default function AnimeCaptcha({ cbm, updateCaptchaIsActive, updateInputRef,
    inputRef, isDesktop, captchaValue, updateCaptchaValue, updateCaptchaToken,
    captchaType
}) {
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
            updateCaptchas(answer.captchas); // .filter((element, index) => index !== 0)
            updStandard(answer.captchas[0]);
            updateNoticeState(false);
        }
    }

    const switchImage = (state) => {
        let index = captchaIndex + state;
        if (index < 1)
            index = captchas.length - 1;
        else if (index > captchas.length - 1)
            index = 1;
        updateCaptchaIndex(index);
    }

    return (
        <div >
            {!noticeIsActive && <div className={styles.container + ' ' + styles.noselect}>
                <div className={isDesktop ? styles.captchaContainer + ' ' + styles.gripGadDesktop : styles.captchaContainer + ' ' + styles.gripGadPortrait}>
                    <div
                        className={(isDesktop ? styles.captchaDesktop : styles.captchaPortrait)}
                        style={{ content: `url(${standard?.body})` }}
                    />

                    <div
                        className={(isDesktop ? styles.captchaDesktop : styles.captchaPortrait)}
                        style={{ background: `url(${captchas[captchaIndex]?.body}) no-repeat center center / cover` }}
                    >
                        <div
                            onClick={() => switchImage(-1)}
                            className={isDesktop ? styles.switchButtonDesktop + ' ' + styles.leftButtonDesktop
                                : styles.switchButtonPortrait + ' ' + styles.leftButtonPortrait} />
                        <div
                            onClick={() => switchImage(1)}
                            className={isDesktop ? styles.switchButtonDesktop + ' ' + styles.rightButtonDesktop
                                : styles.switchButtonPortrait + ' ' + styles.rightButtonPortrait} />
                    </div>
                </div>
            </div>}
            <p className={isDesktop ? styles.updNoticeDesk + ' ' + styles.noselect
                : styles.updNoticePort + ' ' + styles.noselect}>{noticeIsActive ? 'Получаем новую капчу...' : 'Приведите в одинаковое положение'}</p>
            <div className={styles.captchaBttnsContainer + ' ' + styles.noselect}>
                <UpdateCaptchaBttn
                    updateCaptchaIndex={updateCaptchaIndex} updateCaptchaData={updateCaptchaData}
                    isDesktop={isDesktop}
                    updateCaptchaIsActive={updateCaptchaIsActive}
                    updateCaptchaToken={updateCaptchaToken}
                />
            </div>
            <div className={styles.unswerContainer + ' ' + styles.noselect}>
                <CaptchaSubmitBttn isDesktop={isDesktop} captchaValue={captchaValue}
                    cbm={cbm} captchaIDs={[captchas[captchaIndex]?.captchaID]}
                    updateCaptchaIsActive={updateCaptchaIsActive}
                    updateCaptchaData={updateCaptchaData}
                    updateCaptchaToken={updateCaptchaToken}
                    updateCaptchaIndex={updateCaptchaIndex}
                    inputRef={inputRef}
                    updErrCounts={updErrCounts}
                    errCounts={errCounts}
                    captchaType={captchaType}
                />
            </div>

        </div >
    );
}
