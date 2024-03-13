import React from "react";
import { useState } from 'react';

import styles from './updateCaptchaBttn.css';

export default function UpdateCaptchaBttn({ updateCaptchaData, isDesktop, audioStop, updateCaptchaToken,
    updateCaptchaIsActive, updateCaptchaIndex
}) {
    const [rerunCounts, updateRerunCounts] = useState(0);

    return (
        <div >
            <div
                onClick={() => {
                    updateRerunCounts(rerunCounts + 1);
                    if (rerunCounts == 5) {
                        if (updateCaptchaIndex)
                            updateCaptchaIndex(1);
                        updateRerunCounts(0);
                        updateCaptchaToken(false);
                        updateCaptchaIsActive(false);
                    } else {
                        if (audioStop)
                            audioStop();
                        updateCaptchaData(true);
                    }
                }}
                className={isDesktop ? styles.updateCaptchaBttnDesktop : styles.updateCaptchaBttnPortrait} />
        </div>
    );
}