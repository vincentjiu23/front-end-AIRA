import React, { useEffect, useRef, useState } from "react";

const IntroductionSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`w-full py-20 px-6 md:px-12 text-center font-[Montserrat]
        bg-gradient-to-r from-[#ffffff] via-[#c4dbff] to-[#ffffff]
        transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <h2
        className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
        style={{ color: "#191757" }}
      >
        WHAT IS AIRA ?
      </h2>

      <p
        className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
        style={{ color: "#000000" }}
      >
        Use AI-based symptom analysis technology to help you understand 
your potential cancer risk early. By inputting your symptoms or test results, 
our system will provide a fast, accurate, and safe initial analysis.
      </p>
    </section>
  );
};

export default IntroductionSection;
