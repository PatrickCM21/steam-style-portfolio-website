import projects from '../assets/projects.json'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useCallback, useRef} from 'react'
import { Link } from 'react-router'
import { MdNavigateNext } from "react-icons/md";



export default function Store() {
    const autoplay = useRef(
        Autoplay(
        { delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true },
        // root node is set later by Embla; no need to pass here unless using a custom root
        )
    );
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [autoplay.current])

    const scrollPrev = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev()
        autoplay.current.reset();  
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
        autoplay.current.reset();  
    }, [emblaApi])


    const gameElements = projects.map(project => {
        if (!project.featured) return null
        const featuredImages = project.gameplayImages.map((image, index) => {
            if (index > 3) return
            return <img src={image} alt={`${project.name} gameplay - ${index}`}></img>
        })
        return (
            <Link to={`/store/${project.id}`} className='embla__slide'>
                <img src={project.src} alt={project.name} className='slide-main-img'></img>
                <div className='slide-data'>
                    <h2>{project.name}</h2>
                    <div className='slide-gameplay-showcase'>
                        {featuredImages}
                    </div>
                </div>
            </Link>
        )
    })

    return (
        <main className='store'>
            <section className='featured'>
                <h4>Featured & Recommended</h4>
                <div className="embla" >
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className='embla__container'>
                            {gameElements}
                        </div>  
                    </div>
                    <button className="embla_button embla__prev" onClick={scrollPrev}><MdNavigateNext size="70px" color="white" style={{ transform: "rotate(180deg)" }}/></button>
                    <button className="embla_button embla__next" onClick={scrollNext}><MdNavigateNext size="70px" color="white"/></button>
                </div>
            </section>
        </main>
    )
}