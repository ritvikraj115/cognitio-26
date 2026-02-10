import React, { useEffect, useMemo, useState } from 'react';
import ImageNew1 from "../assets/imgs/images/1.jpg";
import ImageNew2 from "../assets/imgs/images/2.jpg";
import ImageNew3 from "../assets/imgs/images/3.jpg";
import ImageNew4 from "../assets/imgs/images/4.jpg";
import ImageNew5 from "../assets/imgs/images/5.jpg";
import ImageNew6 from "../assets/imgs/images/6.jpg";
import Image1 from "../assets/imgs/images/1.png";
import Image2 from "../assets/imgs/images/2.webp";
import Image3 from "../assets/imgs/images/3.png";
import Image12 from "../assets/imgs/images/4.png";
import Image5 from "../assets/imgs/images/5.png";
import Image6 from "../assets/imgs/images/6.png";
import Image7 from "../assets/imgs/images/7.png";
import Image8 from "../assets/imgs/images/8.webp";
import Image9 from "../assets/imgs/images/8.jpeg";
import Image10 from "../assets/imgs/images/10.png";
// import Image11 from "../assets/imgs/images/11.webp";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const images = [
    { src: ImageNew1, alt: 'New Gallery Image 1' },
    { src: ImageNew2, alt: 'New Gallery Image 2' },
    { src: ImageNew3, alt: 'New Gallery Image 3' },
    { src: ImageNew4, alt: 'New Gallery Image 4' },
    { src: ImageNew5, alt: 'New Gallery Image 5' },
    { src: ImageNew6, alt: 'New Gallery Image 6' },
    { src: Image1, alt: 'Gallery Image 1' },
    { src: Image2, alt: 'Gallery Image 2' },
    { src: Image3, alt: 'Gallery Image 3' },
    { src: Image12, alt: 'Gallery Image 4' },
    { src: Image5, alt: 'Gallery Image 5' },
    { src: Image6, alt: 'Gallery Image 6' },
    { src: Image7, alt: 'Gallery Image 7' },
    { src: Image8, alt: 'Gallery Image 8' },
    { src: Image9, alt: 'Gallery Image 9' },
    { src: Image10, alt: 'Gallery Image 10' },
    // { src: Image11, alt: 'Gallery Image 11' },
];

const Gallery = () => {
    const slides = useMemo(() => {
        const chunked = [];
        for (let i = 0; i < images.length; i += 4) {
            chunked.push(images.slice(i, i + 4));
        }
        return chunked;
    }, []);

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (slides.length <= 1) return undefined;
        const id = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 3500);
        return () => clearInterval(id);
    }, [slides.length]);

    return (
        <section id="gallery" className="relative w-full bg-gradient-to-b from-[#f8fafc] via-white to-[#eef2f7] py-24 overflow-hidden" itemScope itemType="http://schema.org/ImageGallery">
            <div className="absolute -top-10 right-10 h-72 w-72 rounded-full bg-emerald-100/50 blur-[90px] pointer-events-none" />
            <div className="absolute -bottom-12 left-6 h-80 w-80 rounded-full bg-amber-100/40 blur-[110px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-14">
                    <p className="text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-3">Gallery</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Event Gallery</h2>
                    <div className="mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 mb-4" />
                    <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
                        Highlights from past editions and unforgettable moments from Cognitio.
                    </p>
                </div>

                <div className="relative">
                    <div className="relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/80 shadow-[0_22px_44px_rgba(15,23,42,0.16)]">
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-emerald-100/60 via-transparent to-transparent" />
                        <div
                            className="flex transition-transform duration-700 ease-out"
                            style={{ transform: `translateX(-${current * 100}%)` }}
                        >
                            {slides.map((slide, slideIndex) => {
                                const filledSlide = [...slide, ...Array(Math.max(0, 4 - slide.length)).fill(null)];
                                return (
                                    <div key={slideIndex} className="w-full shrink-0 p-4 md:p-8">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                            {filledSlide.map((image, index) => (
                                                image ? (
                                                    <figure
                                                        key={`${slideIndex}-${index}`}
                                                        className="group relative block overflow-hidden rounded-2xl bg-white shadow-[0_14px_30px_rgba(15,23,42,0.16)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.22)] transition-shadow duration-300 ring-1 ring-slate-200/70"
                                                        itemProp="image"
                                                        itemScope
                                                        itemType="http://schema.org/ImageObject"
                                                    >
                                                        <LazyLoadImage
                                                            src={image.src}
                                                            alt={image.alt}
                                                            effect="blur"
                                                            className="w-full aspect-[4/3] object-cover transform transition-transform duration-300 group-hover:scale-105"
                                                            wrapperClassName="w-full h-full"
                                                            threshold={300}
                                                        />
                                                        <figcaption className="absolute bottom-0 left-0 right-0 bg-slate-900/70 text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs">
                                                            {image.caption}
                                                        </figcaption>
                                                        <meta itemProp="name" content={image.alt} />
                                                        <meta itemProp="description" content={image.caption} />
                                                    </figure>
                                                ) : (
                                                    <div key={`${slideIndex}-${index}`} className="rounded-2xl bg-slate-100/70 ring-1 ring-slate-200/70 aspect-[4/3]" />
                                                )
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-center gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setCurrent(index)}
                                className={`h-2.5 w-2.5 rounded-full transition-all ${index === current ? "bg-emerald-500 w-6" : "bg-slate-300 hover:bg-slate-400"}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
