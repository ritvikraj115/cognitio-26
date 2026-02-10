import React, { useEffect, useState } from 'react';
import eventData from '../events.json';
import Modal from './Modal';

const formatPrize = (prize) => {
    if (!prize || prize === 'NA') return null;
    return `\u20B9${Number(prize).toLocaleString('en-IN')}`;
};

const Event = ({ id }) => {
    const [event, setEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const foundEvent = eventData[id.toLowerCase().replace(/\s/g, '')] || eventData[id];
        setEvent(foundEvent);
    }, [id]);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <div
            onClick={() => setIsModalOpen(true)}
            className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.04] hover:shadow-[0_20px_50px_rgba(16,185,129,0.08)] cursor-pointer"
        >
            {/* Image */}
            <div className="relative w-full overflow-hidden aspect-[16/10] bg-slate-900">
                <img
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    src={event.img}
                    alt={event.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Prize badge on image */}
                {formatPrize(event.prize) && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/90 backdrop-blur-sm shadow-lg">
                        <svg className="w-3.5 h-3.5 text-amber-900" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v1a2 2 0 002 2h1.06a5.001 5.001 0 003.887 3.876A3.5 3.5 0 008.5 14H8a1 1 0 100 2h4a1 1 0 100-2h-.5a3.5 3.5 0 00-1.447-2.124A5.001 5.001 0 0013.94 7H15a2 2 0 002-2V4a2 2 0 00-2-2H5zm0 2h1v1a3 3 0 001.02 2.252A5.017 5.017 0 015.034 5H5V4zm10 0h-.034a5.017 5.017 0 01-1.986 3.252A3 3 0 0014 5V4h1z" clipRule="evenodd" /></svg>
                        <span className="text-amber-950 text-xs font-bold">{formatPrize(event.prize)}</span>
                    </div>
                )}

                {/* Event name on image bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white tracking-tight drop-shadow-lg">{event.name}</h3>
                </div>
            </div>

            {/* Card content */}
            <div className="p-4">
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-3">{event.desc}</p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                        <span>{event.eh.filter(e => e !== 'NA').length > 0 ? event.eh.filter(e => e !== 'NA').join(', ') : ''}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                        Details
                        <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                    </span>
                </div>
            </div>
        </div>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="relative">
                {/* Hero image */}
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-2xl">
                    <img
                        src={event.img}
                        alt={event.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">{event.name}</h2>
                        {formatPrize(event.prize) && (
                            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 backdrop-blur-sm">
                                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v1a2 2 0 002 2h1.06a5.001 5.001 0 003.887 3.876A3.5 3.5 0 008.5 14H8a1 1 0 100 2h4a1 1 0 100-2h-.5a3.5 3.5 0 00-1.447-2.124A5.001 5.001 0 0013.94 7H15a2 2 0 002-2V4a2 2 0 00-2-2H5zm0 2h1v1a3 3 0 001.02 2.252A5.017 5.017 0 015.034 5H5V4zm10 0h-.034a5.017 5.017 0 01-1.986 3.252A3 3 0 0014 5V4h1z" clipRule="evenodd" /></svg>
                                <span className="text-amber-300 font-bold text-lg">Prize: {formatPrize(event.prize)}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="px-6 py-6 space-y-6">
                    {/* Description */}
                    <p className="text-slate-300 text-[15px] leading-relaxed">{event.desc}</p>

                    {/* Quick info pills */}
                    {event.details1.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {event.details1.map((detail, index) => (
                                <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-white/[0.06] text-slate-300 text-xs">
                                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                                    {detail}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Rounds */}
                    {event.details2.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Rounds & Structure</h3>
                            <div className="space-y-3">
                                {event.details2.map((round, index) => (
                                    <div key={index} className="rounded-xl border border-white/[0.06] bg-slate-800/30 overflow-hidden">
                                        <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.02] border-b border-white/[0.04]">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold">{index + 1}</span>
                                            <h4 className="font-semibold text-sm text-white">{round.heading}</h4>
                                        </div>
                                        <ul className="px-4 py-3 space-y-2">
                                            {round.points.map((point, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm leading-relaxed">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400/50 shrink-0" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer: Event Heads */}
                    {event.eh.filter(e => e !== 'NA').length > 0 && (
                        <div className="pt-4 border-t border-white/[0.06]">
                            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Event Heads</h3>
                            <div className="flex flex-wrap gap-2">
                                {event.eh.filter(e => e !== 'NA').map((head, index) => (
                                    <span key={index} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/15 text-emerald-300 text-sm font-medium">
                                        <svg className="w-3.5 h-3.5 text-emerald-500/60" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                        {head}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
        </>
    );
};

export default Event;
