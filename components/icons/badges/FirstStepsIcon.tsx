import React from 'react';

const FirstStepsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m7 18-3-3 3-3" />
        <path d="M11 21H4" />
        <path d="M21 16V8a2 2 0 0 0-2-2H7" />
        <path d="M18 21a2 2 0 0 0 2-2V7" />
        <path d="m14 15-3 3 3 3" />
    </svg>
);

export default FirstStepsIcon;
