import { useEffect, useRef, useState } from "react";

function LazyLoadCard({ children }) {
  const parentRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = parentRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return visible ? (
    children
  ) : (
    <div ref={parentRef} className="min-h-[380px]" aria-hidden="true" />
  );
}

export default LazyLoadCard;
