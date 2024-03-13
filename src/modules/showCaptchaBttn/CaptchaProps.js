import { useState } from 'react';
import React from 'react';

export default function CaptchaProps() {
    const [captchaIsActive, updateCaptchaIsActive] = useState(false);
    const [captchaToken, updateCaptchaToken] = useState(false);

    return { captchaIsActive, updateCaptchaIsActive, captchaToken, updateCaptchaToken }
}