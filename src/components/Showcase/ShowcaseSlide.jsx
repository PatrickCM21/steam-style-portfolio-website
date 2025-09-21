import { useRef, useState, useLayoutEffect } from "react";
import { MdNavigateNext } from "react-icons/md";

export default function ShowcaseSlide({ children }) {

    const [side, setSide] = useState("left");
    const [noButton, setNoButton] = useState(false)
    const scrollBar = useRef();
    const leftBtn = useRef();
    const rightBtn = useRef();

    
    useLayoutEffect(() => {
        const update = () => {
            const scroll = scrollBar.current;
            if (scroll.clientWidth >= scroll.scrollWidth) {
                setNoButton(true)
            } else {
                setNoButton(false)
            }
        }
        update()

        requestAnimationFrame(() => {
            update()
        })

    }, [])
    
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
                className={`slide-btn slide-btn-left ${side === 'left' && !noButton ? "invisible" : ""}` }
                onClick={() => scrollProjects("left")} ref={leftBtn}>
                    <MdNavigateNext color="white"/></button>
            <div className='showcase-image-slide' ref={scrollBar}>                                  
                {children}
            </div>
            <button 
                className={`slide-btn slide-btn-right ${side === 'right'  && !noButton ? "invisible" : ""}` }
                onClick={() => scrollProjects("right")} ref={rightBtn}>
                    <MdNavigateNext color="white"/></button>
        </div>
    )
}