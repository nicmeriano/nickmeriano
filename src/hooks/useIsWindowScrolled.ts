import { useState, useEffect } from 'react';

export const useIsWindowScrolled = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    const onScroll = () => {
        setIsScrolled(window.scrollY > 0);
    };

    useEffect(() => {
        const scrollObserver = new IntersectionObserver(onScroll, { threshold: 1 });
        const target = document.documentElement;

        scrollObserver.observe(target);

        return () => scrollObserver.disconnect();
    }, []);

    return isScrolled;
};
