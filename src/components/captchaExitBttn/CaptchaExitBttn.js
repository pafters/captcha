import React from 'react';

import styles from './captchaExitBttn.css';

export default function CaptchaExitBttn({ isDesktop, updateCaptchaIsActive }) {

    function leftCaptchaContainer() {
        updateCaptchaIsActive(false);
    }

    return (
        <div className={styles.captachaExitContainer + ' ' + styles.noselect}>
            <img
                onClick={leftCaptchaContainer}
                className={isDesktop ? styles.captchaExitBttnDesktop
                    : styles.captchaExitBttnPortrait}
            />
        </div>
    );
}