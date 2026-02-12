import React from 'react';

export const LoginHeading = ({ text }) => {
    return (
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
            {text}
        </h2>
    );
};
