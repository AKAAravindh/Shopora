import { useEffect, useRef, useState } from "react";

function LazyLoadCard({ children }) {
  const parentRef = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(parentRef.current);

    return () => observer.disconnect();
  }, []);

  return visible ? children : <div ref={parentRef} />;
}

export default LazyLoadCard;
