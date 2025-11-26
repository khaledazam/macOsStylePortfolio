import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import useWindowStore from "#store/window.js";

const WindowWrapper = (Component, windowKey) => {

    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey];
        const ref = useRef(null);

        // animation عند فتح/إغلاق النافذة
        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;

            if (isOpen) {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: -20, display: 'block' },
                    { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
                );

                // make draggable عند فتح النافذة
                Draggable.create(el, {
                    type: 'x,y',
                    edgeResistance: 0.65,
                    bounds: window, // يتحرك داخل شاشة المتصفح
                    inertia: true,
                    onPress: () => focusWindow(windowKey), // عند الضغط يتم رفع النافذة للأمام
                });
            } else {
                gsap.to(el,
                    {
                        opacity: 0,
                        y: -20,
                        duration: 0.2,
                        ease: 'power2.in',
                        onComplete: () => { el.style.display = 'none'; }
                    }
                );

                // إزالة Draggable عند الإغلاق
                Draggable.get(el)?.forEach(d => d.kill());
            }
        }, [isOpen]);

        if (!isOpen) return null;

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{ zIndex }}
                className="absolute"
                onMouseDown={() => focusWindow(windowKey)}
            >
                <Component {...props} />
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

    return Wrapped;
};

export default WindowWrapper;
