import React, { useState } from "react";
import { toast } from "react-toastify";
import { sendToSheet } from "../utils/sendForm";

const Register = ({ onClose }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        registrationNumber: "",
        email: "",
        branch: "",
        events: [],
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const eventOptions = [
        "ELEVATOR PITCH",
        "QURIOSITY",
        "ASSEMBLAGE",
        "PLACE STATION",
        "DICTUM SYMPOSIUM",
        "SHOOT AT SIGHT",
        "ROBOWAR",
        "CANSYS",
        "POSTER PRESENTATION",
        "CULTURAL NIGHT",
        "LOCK-IT-IN",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => {
            const events = checked
                ? [...prevData.events, value]
                : prevData.events.filter((event) => event !== value);
            return { ...prevData, events };
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";

        const registrationNumberPattern = /^(202[2-5])[A-Za-z]{2}[A-Za-z]{2}\d{3}$/;
        if (!formData.registrationNumber.trim().toUpperCase()) {
            newErrors.registrationNumber = "Registration Number is required";
        } else if (!registrationNumberPattern.test(formData.registrationNumber)) {
            newErrors.registrationNumber = "Invalid Registration Number";
        }

        const emailPattern = /^[0-9]{4}[A-Za-z]{2}[a-zA-Z]{2}\d{3}@nitjsr\.ac\.in$/i;
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailPattern.test(formData.email)) {
            newErrors.email = "Please use your college email";
        }

        if (!formData.branch) newErrors.branch = "Branch is required";
        if (formData.events.length === 0) newErrors.events = "Select at least one event";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const result = await sendToSheet(formData);
            if (result?.status === "success") {
                toast.success("Registration successful!");
                setFormData({
                    firstName: "",
                    lastName: "",
                    registrationNumber: "",
                    email: "",
                    branch: "",
                    events: [],
                });
                onClose();
            } else {
                throw new Error(result?.message || "Submission failed");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Submission failed. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="rounded-[30px] bg-gradient-to-br from-emerald-500/30 via-slate-900/80 to-amber-400/20 p-[1px] shadow-[0_40px_90px_rgba(2,6,23,0.6)]">
                <div className="relative overflow-hidden rounded-[28px] bg-[#0b0f14] border border-white/10">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-emerald-500/15 via-emerald-500/5 to-transparent" />
                    <div className="relative px-6 py-6 border-b border-white/10">
                        <p className="text-emerald-300/90 text-xs font-semibold tracking-[0.3em] uppercase mb-2">Registration</p>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Register for Events</h2>
                        <p className="text-sm text-slate-300 mt-1">Secure your spot for Cognitio '26.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-7 p-6 md:p-8">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">Your Details</p>
                            <span className="h-px flex-1 bg-white/10 ml-4" />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`mt-2 w-full rounded-xl border ${errors.firstName ? "border-red-500" : "border-white/10"
                                        } bg-slate-900/70 px-3.5 py-2.5 text-slate-100 shadow-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                                />
                                {errors.firstName && (
                                    <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`mt-2 w-full rounded-xl border ${errors.lastName ? "border-red-500" : "border-white/10"
                                        } bg-slate-900/70 px-3.5 py-2.5 text-slate-100 shadow-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                                />
                                {errors.lastName && (
                                    <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Registration Number
                                </label>
                                <input
                                    type="text"
                                    name="registrationNumber"
                                    placeholder="Registration Number"
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                    className={`mt-2 w-full rounded-xl border ${errors.registrationNumber ? "border-red-500" : "border-white/10"
                                        } bg-slate-900/70 px-3.5 py-2.5 text-slate-100 shadow-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                                />
                                {errors.registrationNumber && (
                                    <p className="text-red-400 text-sm mt-1">{errors.registrationNumber}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`mt-2 w-full rounded-xl border ${errors.email ? "border-red-500" : "border-white/10"
                                        } bg-slate-900/70 px-3.5 py-2.5 text-slate-100 shadow-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                                />
                                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">Branch</label>
                            <select
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                className={`mt-2 w-full rounded-xl border ${errors.branch ? "border-red-500" : "border-white/10"
                                    } bg-slate-900/70 px-3.5 py-2.5 text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                            >
                                <option value="">Select Branch</option>
                                <option value="ME">Mechanical Engineering</option>
                                <option value="ECM">Engineering & Computational Mechanics</option>
                                <option value="CSE">Computer Science & Engineering</option>
                                <option value="EE">Electrical Engineering</option>
                                <option value="ECE">Electronics & Communication Engineering</option>
                                <option value="PIE">Production & Industrial Engineering</option>
                                <option value="META">Metallurgical & Materials Science Engineering</option>
                                <option value="CE">Civil Engineering</option>
                            </select>
                            {errors.branch && <p className="text-red-400 text-sm mt-1">{errors.branch}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">Event Selection</p>
                            <span className="h-px flex-1 bg-white/10 ml-4" />
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 md:p-5">
                            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-4">Select Events</h3>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {eventOptions.map((event) => (
                                    <label key={event} className="flex items-center gap-2 rounded-xl border border-white/5 bg-slate-900/80 px-3 py-2 text-slate-100 shadow-sm hover:border-emerald-400/40 hover:bg-slate-900 transition">
                                        <input
                                            type="checkbox"
                                            value={event}
                                            checked={formData.events.includes(event)}
                                            onChange={handleCheckboxChange}
                                            className="h-4 w-4 text-emerald-500 border-white/20 rounded focus:ring-emerald-500"
                                        />
                                        <span className="text-sm">{event}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.events && <p className="text-red-400 text-sm mt-2">{errors.events}</p>}
                        </div>

                        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                            <p className="text-xs text-slate-400">By registering, you agree to event guidelines.</p>
                            <button
                                type="submit"
                                className="group w-full sm:w-auto rounded-full bg-emerald-600 px-7 py-2.5 text-white font-semibold shadow-[0_18px_32px_rgba(16,185,129,0.25)] hover:bg-emerald-500 transition focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                <span className="inline-flex items-center gap-2">
                                    {loading ? "Submitting..." : "Register"}
                                    {!loading && (
                                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                                        </svg>
                                    )}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
