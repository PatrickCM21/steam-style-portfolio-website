import { useRef, useState } from "react";
import { MdNavigateNext } from "react-icons/md";

export default function ShowcaseSlide({ children }) {
    const [side, setSide] = useState("left");

    const scrollBar = useRef();
    const leftBtn = useRef();
    const rightBtn = useRef();

    function scrollProjects(direction) {
        // Let users choose to have auto scrolling or not
        const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
        const scroll = scrollBar.current;
        const target = direction === 'left' ? 0 : scroll.scrollWidth - scroll.clientWidth;
        scroll.scrollTo({ left: target, behavior: prefersReduced ? 'auto' : 'smooth' })
        setSide(direction)
    }

    return (
        <div className='showcase-slide'> 
            <button 
                style={{visibility: side === 'left' ? "hidden" : "visible"}}
                className='slide-btn slide-btn-left' 
                onClick={() => scrollProjects("left")} ref={leftBtn}>
                    <MdNavigateNext color="white"/></button>
            <div className='showcase-image-slide' ref={scrollBar}>                                  
                {children}
            </div>
            <button 
                style={{visibility: side === 'right' ? "hidden" : "visible"}}
                className='slide-btn slide-btn-right' 
                onClick={() => scrollProjects("right")} ref={rightBtn}>
                    <MdNavigateNext color="white"/></button>
        </div>
    )
}