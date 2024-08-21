import { RefObject, useEffect } from 'react';

export function useOutsideClick<T extends HTMLElement>(ref: RefObject<T>, callback: () => void) {
    useEffect(() => {
        console.log(ref.current);

        const handleClickOutside = (e: MouseEvent) => {
            console.log(e.target);

            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [ref, callback]);
}
