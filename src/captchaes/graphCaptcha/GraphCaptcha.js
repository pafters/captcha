import { useEffect, useState, createRef } from 'react';
import React from 'react'

// import CaptchaSlider from '../../components/slider/CaptchaSlider';
// import CaptchaInput from '../../components/captchaInput/CaptchaInput';
import CaptchaSubmitBttn from '../../components/captchaSubmitBttn/CaptchaSubmitBttn';
import UpdateCaptchaBttn from '../../components/updateCaptchaBttn/UpdateCaptchaBttn';

import styles from './graphCaptcha.css';

export default function GraphCaptcha({ cbm, updateCaptchaIsActive, updateInputRef,
    inputRef, isDesktop, captchaValue, updateCaptchaValue, updateCaptchaToken,
    captchaType
}) {
    const [errCounts, updErrCounts] = useState(0);
    const [captchas, updateCaptchas] = useState([]);
    const [captchaIndex, updateCaptchaIndex] = useState(0);
    const [activeCaptchasIndex, updActiveCapthasIndex] = useState([]);
    const [activeCaptchas, updActiveCapthas] = useState([]);
    const [activeStates, updateActiveStates] = useState([
        false, false, false,
        false, false, false,
        false, false, false,
    ]);

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
            //setTimeout(() => updateNoticeState(false), 1000)
        }
    }

    function changeCaptchaState(index) {
        const indexCaptcha = activeCaptchasIndex.indexOf(index)
        const newActiveStates = [...activeStates];
        if (indexCaptcha >= 0) {
            updActiveCapthasIndex([...activeCaptchasIndex].filter(function (elem) {
                return elem !== index
            }));

            updActiveCapthas([...activeCaptchas].filter((item, i) => {
                return captchas[index].captchaID !== item
            }))
            newActiveStates[index] = false;
            updateActiveStates(newActiveStates);
        } else {
            updActiveCapthasIndex([...activeCaptchasIndex, index]);
            updActiveCapthas([...activeCaptchas, captchas[index].captchaID])
            newActiveStates[index] = true;
            updateActiveStates(newActiveStates);
        }
    }

    return (
        <div >
            <div className={styles.container}>
                <div className={isDesktop ? styles.captchaContainer + ' ' + styles.gripGadDesktop : styles.captchaContainer + ' ' + styles.gripGadPortrait}>
                    {captchas.map((captcha, index) =>
                        <div onClick={() => { changeCaptchaState(index) }} key={index}
                            className={(isDesktop ? styles.captchaDesktop + ' ' + (activeStates[index] ? styles.elemActiveDesktop : '')
                                : styles.captchaPortrait + ' ' + (activeStates[index] ? styles.elemActivePortrait : ''))}
                            style={{ content: `url(${captcha?.body})` }}
                        ></div>
                    )}
                </div>
            </div>
            <p className={isDesktop ? styles.updNoticeDesk
                : styles.updNoticePort}>{noticeIsActive ? 'Получаем новую капчу...' : 'Выберите все одинаковые изображения'}</p>
            <div className={styles.captchaBttnsContainer}>
                <UpdateCaptchaBttn
                    updateCaptchaIndex={updateCaptchaIndex} updateCaptchaData={updateCaptchaData}
                    isDesktop={isDesktop}
                    updateCaptchaIsActive={updateCaptchaIsActive}
                    updateCaptchaToken={updateCaptchaToken}
                />
            </div>
            <div className={styles.unswerContainer}>
                <CaptchaSubmitBttn isDesktop={isDesktop} captchaValue={captchaValue}
                    cbm={cbm} captchaIDs={activeCaptchas}
                    updateCaptchaIsActive={updateCaptchaIsActive}
                    updateCaptchaData={updateCaptchaData}
                    updateCaptchaToken={updateCaptchaToken}
                    updateCaptchaIndex={updateCaptchaIndex}
                    inputRef={inputRef}
                    captchaIndex={captchaIndex}
                    updErrCounts={updErrCounts}
                    errCounts={errCounts}
                    captchaType={captchaType}
                    updateActiveStates={updateActiveStates}
                />
            </div>

        </div >
    );
}
