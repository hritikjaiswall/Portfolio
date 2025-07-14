import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TestAOS = () => {
    useEffect(() => {
        // Initialize AOS
        AOS.init({ once: false, duration: 1000 });

        // Function to check will-change properties
        const checkWillChange = () => {
            const aosElements = document.querySelectorAll('[data-aos]');
            console.log(`Found ${aosElements.length} elements with data-aos`);

            aosElements.forEach((el, index) => {
                el.style.border = '2px dashed red'; // Visual debug border

                const computedStyle = window.getComputedStyle(el);
                console.log(`Element ${index + 1}:`, {
                    'data-aos': el.getAttribute('data-aos'),
                    'will-change': computedStyle.getPropertyValue('will-change'),
                    'tag': el.tagName,
                    'classes': el.className
                });
            });
        };

        // Run check after slight delay to ensure DOM updates
        setTimeout(checkWillChange, 300);
    }, []);

    return (
        <>
            <style>
                {`
                    [data-aos] {
                        will-change: transform, opacity !important;
                    }
                `}
            </style>
        </>
    );
};

export default TestAOS;
