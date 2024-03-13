import { useEffect, useState } from 'react';
import React from 'react';
import styles from './captchaSlider.css';

export default function CaptchaSlider({ isDesktop, updateCaptchaData, updateCaptchaIndex, captchas, captchaIndex }) {

    const [width, setWidth] = useState(0);

    const [failedCounts, updateFailedCounts] = useState(0);

    const changeWidth = (event) => {
        setWidth(event.target.value);
        updateCaptchaIndex(event.target.value / 20);
    };

    function checkRangePosition() {
        updateFailedCounts(failedCounts + 1);
        if (failedCounts == 4) {
            updateFailedCounts(0);
            updateCaptchaData();
        }

    }


    return (
        <div>
            {captchas &&
                <input
                    className={isDesktop ? styles.captchaSliderDesktop + ' ' + styles.captchaSlider :
                        styles.captchaSliderPortrait + ' ' + styles.captchaSlider}
                    type="range"
                    onChange={changeWidth}
                    onMouseUp={() => checkRangePosition()}
                    onTouchEnd={() => checkRangePosition()}
                    min={0}
                    max={(captchas.length - 1) * 20}
                    step={20}
                    value={width}
                />
            }

            {/* <p>{width}</p> */}
        </div>
    );
}
