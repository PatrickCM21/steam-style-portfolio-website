import projects from '../assets/projects.json'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useCallback, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { MdNavigateNext } from "react-icons/md";
import { DotButton, useDotButton } from './Carousel/CarouselButton'
import { useCookies } from 'react-cookie'

const categories = ["All", "React", "React Native", "JavaScript", "Python", "SQLite", "ChatGPT API", "HTML/CSS"]

export default function Store() {
    const autoplay = useRef(
        Autoplay(
            { delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true },
        )
    );
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [autoplay.current])
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    const [searchParams, setSearchParams] = useSearchParams()
    const [activeCategory, setActiveCategory] = useState(() => {
        const urlCat = searchParams.get('category')
        return urlCat && categories.includes(urlCat) ? urlCat : "All"
    })
    const [cookies] = useCookies(['wishlist', 'gameStars'])
    const wishlistIds = cookies.wishlist ?? []
    const starsByGame = cookies.gameStars ?? {}

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

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

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const mobileMode = windowSize.width < 800 ? true : false

    function getReviewLabel(gameId) {
        const rating = starsByGame[gameId];
        if (rating === undefined || rating === -1) return { text: "Very Positive", class: "positive" };
        if (rating >= 4) return { text: "Overwhelmingly Positive", class: "overwhelming" };
        if (rating === 3) return { text: "Mostly Positive", class: "positive" };
        if (rating === 2) return { text: "Mixed", class: "mixed" };
        return { text: "Mostly Negative", class: "negative" };
    }

    // Filter projects based on selected category
    function matchTech(projectTechs, cat) {
        if (cat === "All") return true
        if (cat === "HTML/CSS") {
            return projectTechs.includes("html") || projectTechs.includes("css")
        }
        return projectTechs.includes(cat.toLowerCase())
    }

    const featuredProjects = projects.filter(project => project.featured && matchTech(project.technologies, activeCategory))
    
    // All matching projects (featured or not) shown in the list section
    const listProjects = projects.filter(project => {
        return matchTech(project.technologies, activeCategory)
    })

    const gameElements = featuredProjects.map(project => {
        const featuredImages = project.gameplayImages.slice(0, 4).map((image, index) => {
            return <img key={index} src={image} alt={`${project.name} gameplay - ${index}`} className="slide-gameplay-thumb"></img>
        })

        const review = getReviewLabel(project.id);
        const isWishlisted = wishlistIds.includes(project.id)

        return (
            <Link to={`/store/${project.id}`} className='embla__slide' key={project.id}>
                <div className="slide-left">
                    <img src={project.src} alt={project.name} className='slide-main-img'></img>
                </div>
                <div className='slide-data'>
                    <div className="slide-header">
                        <h2>{project.name}</h2>
                        {isWishlisted && <span className="wishlist-badge">ON WISHLIST</span>}
                    </div>
                    <div className='slide-gameplay-showcase'>
                        {featuredImages}
                    </div>
                    <div className="slide-meta">

                        <div className="slide-meta-row">
                            <span className="meta-label">Overall Reviews:</span>
                            <span className={`meta-value review-${review.class}`}>{review.text}</span>
                        </div>
                        <div className="slide-tags">
                            {project.technologies.slice(0, 3).map(tech => (
                                <span className="slide-tag" key={tech}>{tech}</span>
                            ))}
                        </div>
                        <div className="slide-price-row">

                            <div className="price-tag free">
                                <div className="discount-pct">-100%</div>
                                <div className="price-details">
                                    <span className="original-price">$19.99</span>
                                    <span className="discounted-price">Free</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    })

    const mobileGameElements = featuredProjects.map(project => {
        const isWishlisted = wishlistIds.includes(project.id)
        return (
            <Link to={`/store/${project.id}`} className='embla__slide' key={project.id}>
                <img src={project.src} alt={project.name} className='slide-main-img-mobile'></img>
                {isWishlisted && <span className="wishlist-badge mobile-badge">ON WISHLIST</span>}
            </Link>
        )
    })

    const nonFeaturedGames = listProjects.map(project => {
        const review = getReviewLabel(project.id)
        const isWishlisted = wishlistIds.includes(project.id)
        return (
            <Link to={`/store/${project.id}`} className='games-list-game' key={project.id}>
                <img src={project.src} alt={project.name} className='game-main-img'></img>
                <div className='game-list-info'>
                    <div className="game-list-title-row">
                        <h3>{project.name}</h3>
                        {isWishlisted && <span className="wishlist-badge-small">WISHLISTED</span>}
                    </div>
                    <div className="game-list-meta">

                        <div className="game-list-tags">
                            {project.technologies.slice(0, 3).map(tech => (
                                <span className="game-list-tag" key={tech}>{tech}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="game-list-pricing">
                    <span className={`game-list-review review-${review.class}`}>{review.text}</span>
                    <div className="price-tag free small">
                        <div className="discount-pct">-100%</div>
                        <div className="price-details">
                            <span className="original-price">$9.99</span>
                            <span className="discounted-price">Free</span>
                        </div>
                    </div>
                </div>
            </Link>
        )
    })

    const dotElements = scrollSnaps.map((el, index) => {
        return (
            <DotButton key={index} className={`embla__dot ${index === selectedIndex ? "embla__dot_selected" : ''}`} onClick={() => onDotButtonClick(index)}></DotButton>
        )
    })

    return (
        <main className='store'>
            <div className="store-sub-nav">
                <div className="store-sub-nav-content">
                    <span className="store-sub-label">Browse by Category:</span>
                    {categories.map(cat => (
                        <button 
                            key={cat} 
                            onClick={() => {
                                setActiveCategory(cat)
                                if (cat === "All") {
                                    setSearchParams({})
                                } else {
                                    setSearchParams({ category: cat })
                                }
                            }}
                            className={`store-sub-link ${activeCategory === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {activeCategory === "All" && featuredProjects.length > 0 && (
                <section className='featured'>
                    <h3 className="section-title">Featured & Recommended</h3>
                    <div id='embla' className="embla" >
                        <div className="embla__viewport" ref={emblaRef}>
                            <div className='embla__container'>
                                {mobileMode ? mobileGameElements : gameElements}
                            </div>  
                        </div>
                        {!mobileMode && <>
                        <button className="embla_button embla__prev" onClick={scrollPrev} key="btn-1"><MdNavigateNext size="40px" color="white" style={{ transform: "rotate(180deg)" }}/></button>
                        <button className="embla_button embla__next" onClick={scrollNext} key="btn-2"><MdNavigateNext size="40px" color="white"/></button>
                        </>}
                    </div>
                    <div className="embla__dots">
                        {dotElements}
                    </div>
                </section>
            )}

            <div className='games-list-background'>
                <section className='games-list'>
                    <h3 className="section-title">
                        {activeCategory === "All" ? "All Projects" : `Projects using ${activeCategory}`}
                    </h3>
                    <div className="games-list-container">
                        {nonFeaturedGames.length > 0 ? nonFeaturedGames : (
                            <div style={{ padding: '30px', textAlign: 'center', color: '#8f98a0', fontSize: '14px' }}>
                                No projects found using this technology.
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}