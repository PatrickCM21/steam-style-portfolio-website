import { useRef } from "react";
import { MdNavigateNext } from "react-icons/md";

export default function ShowcaseSlide({ children }) {
    const scrollBar = useRef();
    function scrollProjects(direction) {
        // Let users choose to have auto scrolling or not
        const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
        const scroll = scrollBar.current;
        const target = direction === 'left' ? 0 : scroll.scrollWidth - scroll.clientWidth;
        scroll.scrollTo({ left: target, behavior: prefersReduced ? 'auto' : 'smooth' })
    }

    return (
        <div className='showcase-slide'> 
            <button className='slide-btn slide-btn-left' onClick={() => scrollProjects("left")}><MdNavigateNext color="white"/></button>
            <div className='showcase-image-slide' ref={scrollBar}>                                  
                {children}
            </div>
            <button className='slide-btn slide-btn-right' onClick={() => scrollProjects("right")}><MdNavigateNext color="white"/></button>
        </div>
    )
}