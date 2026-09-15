import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80",
    eyebrow: "New Collection 2026",
    title: (
      <>
        Style that
        <br />
        speaks for you.
      </>
    ),
    description:
      "Discover the latest fashion, footwear and accessories designed to elevate your everyday style.",
    primaryText: "Shop Now",
    primaryLink: "/products",
    secondaryText: "New Arrivals",
    secondaryLink: "/products/new-arrivals",
  },

  {
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=80",
    eyebrow: "Trending Now",
    title: (
      <>
        Find your
        <br />
        everyday style.
      </>
    ),
    description:
      "Explore carefully selected pieces that bring comfort, confidence and personality to every look.",
    primaryText: "Explore Collection",
    primaryLink: "/products",
    secondaryText: "Best Sellers",
    secondaryLink: "/products/best-selling",
  },

  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=80",
    eyebrow: "Fresh Arrivals",
    title: (
      <>
        Your style.
        <br />
        Your statement.
      </>
    ),
    description:
      "From everyday essentials to standout pieces, discover something made for your wardrobe.",
    primaryText: "Shop New",
    primaryLink: "/products/new-arrivals",
    secondaryText: "Shop Sale",
    secondaryLink: "/products/sale",
  },
];

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) =>
        current === heroSlides.length - 1 ? 0 : current + 1,
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const slide = heroSlides[activeSlide];

  return (
    <section className="max-w-[1920px] px-4 pt-4 sm:px-6 mx-0 lg:px-8">
      <div className="relative min-h-125 overflow-hidden rounded-3xl bg-gray-100">
        {/* Background image */}
        <AnimatePresence mode="sync">
          <motion.img
            key={activeSlide}
            src={slide.image}
            alt="Fashion collection"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: 1.2,
              },
              scale: {
                duration: 6,
                ease: "linear",
              },
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/20 to-transparent" />

        {/* Content */}
        <div className="relative flex min-h-125 max-w-xl items-center px-8 py-16 sm:px-12 lg:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
              className="text-white"
            >
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="mb-4 text-sm font-semibold uppercase tracking-[0.25em]"
              >
                {slide.eyebrow}
              </motion.p>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
              >
                {slide.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-5 max-w-md text-sm leading-6 text-white/80 sm:text-base"
              >
                {slide.description}
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  to={slide.primaryLink}
                  className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-gray-900 transition hover:-translate-y-0.5 hover:bg-gray-100"
                >
                  {slide.primaryText}
                </Link>

                <Link
                  to={slide.secondaryLink}
                  className="rounded-full border border-white/70 px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-gray-900"
                >
                  {slide.secondaryText}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-8 flex items-center gap-2 sm:left-12 lg:left-16">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="group flex h-5 items-center"
            >
              <span
                className={`block h-1 rounded-full transition-all duration-500 ${
                  index === activeSlide
                    ? "w-10 bg-white"
                    : "w-5 bg-white/40 group-hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Slide number */}
        <div className="absolute bottom-6 right-8 text-xs font-medium tracking-widest text-white/70 sm:right-12 lg:right-16">
          {String(activeSlide + 1).padStart(2, "0")} /{" "}
          {String(heroSlides.length).padStart(2, "0")}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
