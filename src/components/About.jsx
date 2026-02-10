import React from 'react';
import CognitioPoster from "/main-theme.webp";
import EventList from "/events.webp";

function About() {
  return (
    <section id="about" className="relative w-full bg-gradient-to-b from-[#f8fafc] via-white to-[#eef2f7] py-24 rounded-t-3xl shadow-[0_-14px_30px_rgba(2,6,23,0.08)] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-3">Discover</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            About Cognitio
          </h1>
          <div className="mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 mb-4" />
          <h2 className="text-lg md:text-xl font-medium text-slate-500">
            The Mechanical Extravaganza
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { value: '3', label: 'Days', icon: '' },
            { value: '10+', label: 'Events', icon: '' },
            { value: '500+', label: 'Participants', icon: '' },
            { value: '₹60K+', label: 'Prize Pool', icon: '' },
          ].map((stat) => (
            <div key={stat.label} className="text-center rounded-2xl border border-slate-200/70 bg-white/60 backdrop-blur-sm px-4 py-5 shadow-sm hover:shadow-md hover:border-emerald-200/50 transition-all duration-300">
              <span className="text-2xl mb-1 block">{stat.icon}</span>
              <p className="text-2xl md:text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="space-y-8">
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-300" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">What is Cognitio?</h3>
              </div>
              <p className="text-base text-slate-600 leading-relaxed">
                COGNITIO, the annual fest of the Mechanical Engineering Department at NIT Jamshedpur, celebrates innovation and technology. This year's theme, <strong className="text-slate-800">MECHAMORPH</strong>, pushes engineering beyond limits.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                With competitions, workshops, and expert talks, it's a fusion of creativity and technology, shaping the future of mechanical engineering.
              </p>
            </div>
            <div className="group rounded-2xl overflow-hidden border border-slate-200/70 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img
                src={CognitioPoster}
                alt="Cognitio Poster"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="group rounded-2xl overflow-hidden border border-slate-200/70 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img
                src={EventList}
                alt="Event List"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <div className="space-y-5 mt-18">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 rounded-full bg-gradient-to-b from-amber-400 to-amber-300" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Why Participate?</h3>
              </div>
              <p className="text-base text-slate-600 leading-relaxed">
                Strive for progress, not perfection. COGNITIO provides young minds a platform to check their progress via various competitions and events.
              </p>
              <div className="flex items-center gap-3 rounded-xl border border-emerald-200/60 bg-emerald-50/50 px-5 py-4">
                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <p className="text-sm text-slate-700 font-medium">
                  This three-day extravaganza from <strong className="text-emerald-700">13th to 15th February</strong> unites brilliant minds, fostering creativity, competition, and collaboration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
