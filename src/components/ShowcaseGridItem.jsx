export default function ShowcaseGridItem({job}) {
    console.log(job)
    const {role, place, type, src, description, time} = job;

    const descriptionPoints = Array.isArray(description) 
        ? description.map(point => <li>{point}</li>) 
        : <li>{description}</li>
    return (
        <div className="showcase-item-tooltip" key={role}>
            <img className='showcase-item-icon' src={src} name={role} alt={`${role} ${place} icon`}/>
            <div className="showcase-tooltip-data">
                <h1 className='showcase-tooltip-header'>{role}</h1>    
                <h2 className='showcase-tooltip-header'>{place}</h2> 
                <ul>
                    {descriptionPoints}
                </ul>
                <p className='showcase-tooltip-text'>{time}</p>  
            </div>
        </div>
    )
}