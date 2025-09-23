import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useWindowSize } from 'react-use'

export default function ShowcaseGridItem({job}) {
    const {role, place, type, src, description, time} = job;

    const tooltipParent = useRef(null)
    const tooltipData = useRef(null)
    const { width } = useWindowSize()


    useLayoutEffect(() => {
        const item = tooltipData.current;
        const rect = item.getBoundingClientRect()
        const BUFFER = 2
        if (rect.right > screen.width - BUFFER) {
            item.dataset.flip = "right"
        } else if (rect.left < BUFFER) {
            item.dataset.flip = "left"
        } else {
            const parentsRect = tooltipParent.current.getBoundingClientRect()
            if (parentsRect.right < screen.width / 2 || parentsRect.left <= rect.left) {
                delete item.dataset.flip;
            }
        }
        
    }, [width])

    const descriptionPoints = Array.isArray(description) 
        ? description.map((point, index) => <li key={index}>{point}</li>) 
        : <li key={1}>{description}</li>
    return (
        <div className="showcase-item-tooltip" key={role} ref={tooltipParent}>
            <img className='showcase-item-icon' src={src} name={role} alt={`${role} ${place} icon`}/>
            <div className="showcase-tooltip-data" ref={tooltipData}>
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