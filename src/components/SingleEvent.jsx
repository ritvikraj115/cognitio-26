import React from 'react';

const SingleEvent = ({ id }) => {
    return (
        <div className="event-card bg-white/95 shadow-[0_16px_30px_rgba(2,6,23,0.18)] rounded-2xl p-5 m-4 border border-slate-200/70">
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            <p className="text-slate-600">{date}</p>
            <p className="mt-2">{description}</p>
        </div>
    );
};

export default SingleEvent;
