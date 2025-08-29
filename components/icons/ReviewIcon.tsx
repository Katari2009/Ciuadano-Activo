import React from 'react';

const ReviewIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        {...props}
    >
        <path d="m15 5 4 4" />
        <path d="M13 7 4.5 18.5a2 2 0 0 0 0 2.8l2.8 2.8a2 2 0 0 0 2.8 0L21 11" />
        <path d="m15 12 4.4 4.4" />
        <path d="M5 17 3 19" />
    </svg>
);

export default ReviewIcon;