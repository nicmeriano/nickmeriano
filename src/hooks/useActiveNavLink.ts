import { useState, useEffect } from 'react';

export const useActiveNavLink = (selector: string) => {
    const [activeSection, setActiveSection] = useState<string>();

    useEffect(() => {
        const sections = Array.from(document.querySelectorAll(selector));

        let direction: 'up' | 'down' = 'down';
        let prevYPosition = 0;

        const getTargetSection = (entry: IntersectionObserverEntry) => {
            const index = sections.findIndex((section) => section == entry.target);

            if (index >= sections.length - 1) {
                return entry.target;
            } else {
                return sections[index + 1];
            }
        };

        const shouldUpdate = (entry: IntersectionObserverEntry) => {
            if (direction === 'down' && !entry.isIntersecting) {
                return true;
            }

            if (direction === 'up' && entry.isIntersecting) {
                return true;
            }

            return false;
        };

        const onIntersect: IntersectionObserverCallback = (entries, observer) => {
            entries.forEach((entry) => {
                if (window.scrollY > prevYPosition) {
                    direction = 'down';
                } else {
                    direction = 'up';
                }

                prevYPosition = window.scrollY;

                const target = direction === 'down' ? getTargetSection(entry) : entry.target;

                if (shouldUpdate(entry)) {
                    const section = (target as HTMLElement).dataset.section;
                    setActiveSection(window.scrollY > 0 ? section : 'about');
                }
            });
        };
        const options: IntersectionObserverInit = {
            rootMargin: `-50px`,
            threshold: 0
        };

        const observer = new IntersectionObserver(onIntersect, options);

        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, [selector]);

    return activeSection;
};
