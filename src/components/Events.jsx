import React from 'react';
import Event from './Event';
import eventData from '../events.json';

const EventsSection = () => {
  return (
    <section id="events" className="relative w-full bg-gradient-to-b from-slate-950 via-[#0a1628] to-slate-900 py-24 overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-amber-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">Compete & Innovate</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The Events
          </h2>
          <div className="mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400" />
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm">From robotics to pitching, explore challenges that push the boundaries of engineering and creativity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(eventData).map((ele) => (
            <Event key={ele} id={ele} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
