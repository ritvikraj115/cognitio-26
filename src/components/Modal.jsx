import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-[fadeIn_0.2s_ease-out]"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#111827] to-[#0c1222] shadow-[0_30px_80px_rgba(0,0,0,0.6)] animate-[slideUp_0.25s_ease-out]"
                onClick={(e) => e.stopPropagation()}
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#334155 transparent' }}
            >
                {/* Close button — z-20 ensures it stays above all content */}
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="sticky top-3 float-right mr-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-800/80 backdrop-blur-sm text-slate-300 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-400/50 transition-all duration-200 cursor-pointer"
                    aria-label="Close modal"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="relative">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
