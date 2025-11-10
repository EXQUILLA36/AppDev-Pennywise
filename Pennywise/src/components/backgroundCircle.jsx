import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function BackgroundCircle() {
  useGSAP(() => {
    gsap.fromTo(
      ".slide-up-stagger",
      {
        opacity: 0.2,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3  
      }
    );

    gsap.from(".slide-up-normal", {
      opacity: 0,
      y: 80,
      stagger: 0.1,
      duration: 1,
      ease: "back.inOut",
      scrollTrigger: {
        trigger: ".slide-up-normal",
        start: "top 60%",
        end: "bottom 30%",
        toggleActions: "play reverse play reverse",
      },
    });
  }, []);

  return (
    <div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden h-[100vw] ">
        <div className="slide-up-stagger absolute flex items-center justify-center top-[5vw] -right-[25vw] w-[90vw] aspect-square bg-[#282828] rounded-full z-0">
          <div className="slide-up-stagger flex items-center justify-center w-[70vw] aspect-square bg-[#1e1e1e] rounded-full z-0">
            <div className="slide-up-stagger w-[40vw] aspect-square bg-[#151515] rounded-full z-0"></div>
          </div>
        </div>

        <div className="slide-up-normal absolute w-[8vw] top-[8vw] right-[50vw] aspect-square bg-[#191919] rounded-full shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] z-0"></div>
        <div className="slide-up-normal absolute w-[10vw] top-[30vw] left-[30vw] aspect-square bg-[#191919] rounded-full shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] z-0"></div>
        <div className="slide-up-normal absolute w-[5vw] top-[43vw] right-[2vw] aspect-square bg-[#191919] rounded-full shadow-[-1px_-1px_5px_rgba(255,255,255,0.3),5px_4px_5px_rgba(0,0,0,1)] z-0"></div>
      </div>
    </div>
  );
}
