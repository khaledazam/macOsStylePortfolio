import React, { useRef } from 'react'
import { dockApps } from "#constants/index.js";
import { Tooltip } from 'react-tooltip'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Docks = () => {
    const dockRef = useRef(null);

    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return;

        const icons = dock.querySelectorAll('.dock-icon');

        const animateIcons = (mouseX) => {
            icons.forEach((icon) => {
                const { left, width } = icon.getBoundingClientRect();
                const center = left + width / 2; // center الصحيح بالنسبة للviewport
                const distance = Math.abs(mouseX - center);
                const intensity = Math.exp(-(distance ** 2) / 20000); // يمكن تعديل 20000 لتغيير التأثير

                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity, // يحرك للأعلى
                    duration: 0.2,
                    ease: "power1.out",
                });
            });
        };

        const handleMouseMove = (e) => {
            animateIcons(e.clientX); // هنا نمرر clientX مباشرة
        };


        const resetIcons = () => {
            icons.forEach((icon) =>
                gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    duration: 0.2,
                    ease: "power1.out",
                })
            );
        };

        dock.addEventListener('mousemove', handleMouseMove);
        dock.addEventListener('mouseleave', resetIcons);

        return () => {
            dock.removeEventListener('mousemove', handleMouseMove);
            dock.removeEventListener('mouseleave', resetIcons);
        };
    }, []);

    const toggleApp = (app) => {
        console.log("Open app:", app);
    };

    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {dockApps.map(({ id, name, icon, canOpen }) => (
                    <div key={id} className="relative flex justify-center">
                        <button
                            type="button"
                            className="dock-icon"
                            aria-label={name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp(canOpen)}
                        >
                            <img
                                src={`/images/${icon}`}
                                alt={name}
                                loading="lazy"
                                className={canOpen ? "" : "opacity-75"}
                            />
                        </button>
                    </div>
                ))}
                <Tooltip id="dock-tooltip" place="top" className="tooltip" />
            </div>
        </section>
    );
};
