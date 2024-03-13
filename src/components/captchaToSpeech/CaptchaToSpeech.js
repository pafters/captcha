import React from 'react';
import styles from './captchaToSpeech.css';

export default function CaptchaToSpeech({ audioPlay, isDesktop }) {

    return (
        <div className={isDesktop ? styles.captchaToSpeechBttnDesktop : styles.captchaToSpeechBttnPortrait} onClick={() => audioPlay()}></div>
    );
}