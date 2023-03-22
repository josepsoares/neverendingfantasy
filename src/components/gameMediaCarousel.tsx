import React, { useCallback, useEffect, useState } from 'react';

import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';

type ThumbPropType = {
  selected: boolean;
  imgSrc: string;
  index: number;
  onClick: () => void;
};

export const Thumb: React.FC<ThumbPropType> = props => {
  const { selected, imgSrc, index, onClick } = props;

  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : ''
      )}
    >
      <button
        onClick={onClick}
        className="embla-thumbs__slide__button"
        type="button"
      >
        <div className="embla-thumbs__slide__number">
          <span>{index + 1}</span>
        </div>
        <img
          className="embla-thumbs__slide__img"
          src={imgSrc}
          alt="Your alt text"
        />
      </button>
    </div>
  );
};

// TODO - refactor styles from codesandbox example

type PropType = {
  slides: { item: string; thumbnail: string; type: 'image' | 'video' }[];
  options?: EmblaOptionsType;
};

const GameMediaCarousel: React.FC<PropType> = props => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      if (emblaThumbsApi.clickAllowed()) emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((slide, i) => (
            <div className="embla__slide" key={i}>
              <img
                className="embla__slide__img"
                src={slide.item}
                alt="Your alt text"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((slide, i) => (
              <Thumb
                key={i}
                index={i}
                imgSrc={slide.item}
                onClick={() => onThumbClick(i)}
                selected={i === selectedIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMediaCarousel;
