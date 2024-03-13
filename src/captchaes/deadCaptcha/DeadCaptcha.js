import React from "react";

import styles from "./deadCaptcha.css";

export default function DeadCaptcha({ isDesktop }) {

    return (
        <div>
            <div className={styles.serverStatus}></div>
            <span className={isDesktop ? styles.captchaStatusNotificationdDesktop : styles.captchaStatusNotificationdPortrait}>Сервер спит</span>
        </div>
    );
} 