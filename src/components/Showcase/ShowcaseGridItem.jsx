import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useWindowSize } from 'react-use'

export default function ShowcaseGridItem({job}) {
    const {role, place, type, src, description, time} = job;

    const tooltips = useRef([])
    const tooltipsLen = useRef(0)
    const { width } = useWindowSize()

    tooltips.current = [];
    tooltipsLen.current = 0;


    useLayoutEffect(() => {
        tooltips.current.filter(Boolean).forEach((itemRef) => {
            const rect = itemRef.getBoundingClientRect()
            if (rect.right > width) {
                itemRef.dataset.flip = "right"
            } else if (rect.left < 0) {
                itemRef.dataset.flip = "left"
            }  else {
                delete itemRef.dataset.flip;
            }
        })
    }, [width])

    const descriptionPoints = Array.isArray(description) 
        ? description.map((point, index) => <li key={index}>{point}</li>) 
        : <li key={1}>{description}</li>
    return (
        <div className="showcase-item-tooltip" key={role}>
            <img className='showcase-item-icon' src={src} name={role} alt={`${role} ${place} icon`}/>
            <div className="showcase-tooltip-data" ref={(el) => tooltips.current[tooltipsLen.current++] = el}>
                <h1 className='showcase-tooltip-header'>{role}</h1>    
                {place && <h2 className='showcase-tooltip-header'>{place}</h2> }
                <ul>
                    {descriptionPoints}
                </ul>
                <p className='showcase-tooltip-text'>{time}</p>  
            </div>
        </div>
    )
}