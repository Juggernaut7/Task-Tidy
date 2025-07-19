// C:\Users\HP\Desktop\tasktidy\tasktidy-frontend\src\shared\components\LottieAnimation.jsx
import React from 'react';
import Lottie from 'lottie-react';

const LottieAnimation = ({ animationData, loop = true, autoplay = true, className = '' }) => {
    // Ensure animationData is not null or undefined
    if (!animationData) {
        console.warn("LottieAnimation: animationData is missing.");
        return null;
    }

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <Lottie
                animationData={animationData}
                loop={loop}
                autoplay={autoplay}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default LottieAnimation;