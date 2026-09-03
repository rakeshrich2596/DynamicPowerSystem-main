import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — Repeating scroll-triggered animations.
 *
 * Attaches IntersectionObserver to a container and:
 *  - Adds "revealed" when [data-reveal] child enters viewport
 *  - Removes "revealed" when it leaves viewport (so it re-animates on re-entry)
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   <div ref={ref}>
 *     <div data-reveal data-reveal-delay="0">...</div>
 *     <div data-reveal data-reveal-delay="100">...</div>
 *   </div>
 */
export function useScrollReveal(options = {}) {
    const ref = useRef(null);
    const timersRef = useRef([]);

    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        const targets = container.querySelectorAll('[data-reveal]');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const el = entry.target;
                    const delay = Number(el.dataset.revealDelay || 0);

                    if (entry.isIntersecting) {
                        // Cancel any pending hide timer for this element
                        const hideTimer = el._revealHideTimer;
                        if (hideTimer) clearTimeout(hideTimer);

                        // Show with delay
                        const showTimer = setTimeout(() => {
                            el.classList.add('revealed');
                        }, delay);
                        el._revealShowTimer = showTimer;
                    } else {
                        // Cancel any pending show timer
                        const showTimer = el._revealShowTimer;
                        if (showTimer) clearTimeout(showTimer);

                        // Remove immediately when leaving viewport
                        el.classList.remove('revealed');
                    }
                });
            },
            {
                threshold: options.threshold || 0.12,
                rootMargin: options.rootMargin || '0px 0px -40px 0px',
            }
        );

        targets.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
            // Clean up all pending timers
            targets.forEach((el) => {
                if (el._revealShowTimer) clearTimeout(el._revealShowTimer);
                if (el._revealHideTimer) clearTimeout(el._revealHideTimer);
            });
        };
    }, []);

    return ref;
}

/**
 * useRevealOnce — Fires once, never resets.
 * Good for elements that shouldn't re-animate (e.g. hero).
 */
export function useRevealOnce(options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('revealed');
                    observer.unobserve(el);
                }
            },
            {
                threshold: options.threshold || 0.12,
                rootMargin: options.rootMargin || '0px 0px -40px 0px',
            }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
}
