import { useCallback, useEffect, useState } from 'react'

export const useDotButton = (emblaAPI) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState([])

    const onDotButtonClick = useCallback((index) => {
        if (!emblaAPI) return
        emblaAPI.scrollTo(index)
    }, [emblaAPI])

    const onInit = useCallback(emblaAPI => {
        setScrollSnaps(emblaAPI.scrollSnapList())
    }, [])

    const onSelect = useCallback((emblaAPI) => {
        setSelectedIndex(emblaAPI.selectedScrollSnap())
    }, [])

    useEffect(() => {
        if (!emblaAPI) return

        onInit(emblaAPI)
        onSelect(emblaAPI)
        emblaAPI.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
    }, [emblaAPI, onInit, onSelect])

    return {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick
    }
}

export const DotButton = (props) => {
    const { children, ...restProps } = props

    return (
        <button {...restProps}>
            {children}
        </button>
    )
}
