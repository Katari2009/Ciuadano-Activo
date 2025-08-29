import React from 'react';

const ReadyToVoteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 10V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4" />
        <path d="M21 10v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10" />
        <path d="M16 14h.01" />
        <path d="M12 14h.01" />
        <path d="M8 14h.01" />
        <path d="M4 10h16" />
    </svg>
);

export default ReadyToVoteIcon;
