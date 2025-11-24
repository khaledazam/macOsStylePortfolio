import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, base: 100 },
    title: { min: 400, max: 900, base: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={`${className} inline-block`}
            style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
        >
            {char === ' ' ? '\u00A0' : char}
        </span>
    ));
};

const setupTextHover = (container, type) => {
    if (!container) return;

    const letters = Array.from(container.querySelectorAll('span'));
    if (!letters.length) return;

    const { max, base } = FONT_WEIGHTS[type] ?? FONT_WEIGHTS.title;

    const proxies = letters.map(() => ({ w: base }));

    const applyWeight = (el, w) => {
        el.style.fontVariationSettings = `'wght' ${Math.round(w)}`;
    };

    letters.forEach((el, i) => applyWeight(el, proxies[i].w));

    const getCenterX = (el) => {
        const r = el.getBoundingClientRect();
        return r.left + r.width / 2;
    };

    const onMove = (e) => {
        const mouseX = e.clientX;
        const falloff = 220;

        letters.forEach((el, i) => {
            const dx = Math.abs(mouseX - getCenterX(el));
            const influence = Math.max(0, 1 - dx / falloff);
            const target = base + influence * (max - base);

            gsap.to(proxies[i], {
                w: target,
                duration: 0.25,
                ease: 'power2.out',
                onUpdate: () => applyWeight(el, proxies[i].w),
            });
        });
    };

    const onLeave = () => {
        letters.forEach((el, i) => {
            gsap.to(proxies[i], {
                w: base,
                duration: 0.35,
                ease: 'power2.out',
                onUpdate: () => applyWeight(el, proxies[i].w),
            });
        });
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);

    return () => {
        container.removeEventListener('mousemove', onMove);
        container.removeEventListener('mouseleave', onLeave);
    };
};

const Welcome = () => {
    const scope = useRef();
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        setupTextHover(titleRef.current, 'title');
        setupTextHover(subtitleRef.current, 'subtitle');
    }, { scope });

    return (
        <section id="welcome" ref={scope}>
            <p ref={subtitleRef}>
                {renderText("Hey, I'm Khaled! Welcome to my", 'text-3xl font-georama', 100)}
            </p>
            <h1 ref={titleRef} className="mt-7">
                {renderText('portfolio', 'text-9xl italic font-georama')}
            </h1>
            <div className="small-screen">
                <p>This Portfolio is designed for desktop/tablets screens only.</p>
            </div>
        </section>
    );
};

export default Welcome;
