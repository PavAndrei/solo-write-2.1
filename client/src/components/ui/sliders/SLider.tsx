import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Lightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';
import 'swiper/css';

import { useState, type FC } from 'react';
import { SliderButtonLeft } from './SliderButtonLeft';
import { SliderButtonRight } from './SliderButtonRight';

interface SliderProps {
  slides: string[];
}

export const Slider: FC<SliderProps> = ({ slides }) => {
  // const images = [
  //   'https://picsum.photos/id/1015/800/600',
  //   'https://picsum.photos/id/1016/800/600',
  //   'https://picsum.photos/id/1018/800/600',
  //   'https://picsum.photos/id/1020/800/600',
  //   'https://picsum.photos/id/1024/800/600',
  // ];

  const [index, setIndex] = useState<number>(-1);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="flex max-w-[90%] mx-auto items-center">
      <SliderButtonLeft disabled={isBeginning} />

      <div className="max-w-5/6 mx-auto">
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          navigation={{
            prevEl: '.custom-prev-btn',
            nextEl: '.custom-next-btn',
          }}
          modules={[Navigation]}
          onSwiper={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
            console.log(swiper.isEnd);
          }}
        >
          {slides.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="rounded-xl h-[280px] group overflow-hidden">
                <img
                  loading="lazy"
                  src={src}
                  alt={`Slide ${i}`}
                  className="rounded-xl cursor-pointer w-full h-full object-cover group-hover:scale-111 transition duration-300 ease-in-out"
                  onClick={() => setIndex(i)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <SliderButtonRight disabled={isEnd} />

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides.map((src) => ({ src }))}
      />
    </div>
  );
};
