import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Heading, IconButton } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

const EmblaCarousel: React.FC<{
  slides: { src: string; alt: string; text?: string }[];
}> = ({ slides }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    slidesToScroll: 2,
    skipSnaps: false
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on('select', onSelect);
    onSelect();
  }, [embla, onSelect]);

  console.log(slides);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {slides.map((item, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__inner">
                <Image
                  width="400"
                  height="400"
                  quality="100"
                  className="embla__slide__img"
                  src={item.src}
                  alt={item.alt}
                />
                {item.text && <Heading as="h2">{item.text}</Heading>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <IconButton
        aria-label="Carousel Previous"
        icon={<Icon icon="bx:bx-left-arrow-alt" width="25px" height="25px" />}
        variant="ghost"
        onClick={scrollPrev}
        enabled={prevBtnEnabled}
      />
      <IconButton
        aria-label="Carousel Next"
        icon={<Icon icon="bx:bx-right-arrow-alt" width="25px" height="25px" />}
        variant="ghost"
        onClick={scrollNext}
        enabled={nextBtnEnabled}
      />
    </div>
  );
};

export default EmblaCarousel;
