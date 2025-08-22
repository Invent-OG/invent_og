"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const spanRefs = useRef<HTMLSpanElement[]>([]);

  const toggleHamburger = () => {
    setIsMenuOpen((prev) => !prev);

    // Animate hamburger to cross and back
    if (!isMenuOpen) {
      // Open → transform to cross
      gsap.to(spanRefs.current[0], {
        y: 6,
        rotation: 45,
        transformOrigin: "center",
        duration: 0.3,
      });
      gsap.to(spanRefs.current[1], {
        y: -6,
        rotation: -45,
        transformOrigin: "center",
        duration: 0.3,
      });
    } else {
      // Close → transform back to hamburger
      gsap.to(spanRefs.current[0], { y: 0, rotation: 0, duration: 0.3 });
      gsap.to(spanRefs.current[1], { y: 0, rotation: 0, duration: 0.3 });
    }
  };

  useEffect(() => {
    // GSAP Timeline for menu panels
    const tl = gsap.timeline();

    if (isMenuOpen) {
      if (window.innerWidth < 768) {
        tl.fromTo(
          ".mobile-panel",
          { y: "-100%" },
          { y: "0%", duration: 0.8, ease: "power4.inOut" }
        );
      } else {
        tl.fromTo(
          ".left-panel",
          { y: "-100%" },
          { y: "0%", duration: 0.8, ease: "power4.inOut" }
        );
        tl.fromTo(
          ".right-panel",
          { y: "100%" },
          { y: "0%", duration: 0.8, ease: "power4.inOut" },
          "<"
        );
      }

      tl.to(
        ".menu-item",
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );

      tl.to(
        ".menu-title span",
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );
    } else {
      tl.to(".menu-item", {
        x: -100,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        stagger: { each: 0.05, from: "end" },
      });
      tl.to(
        ".menu-title span",
        {
          x: (i) => (i % 2 === 0 ? -50 : 50),
          opacity: 0,
          duration: 0.4,
          ease: "power3.in",
        },
        "<"
      );

      if (window.innerWidth < 768) {
        tl.to(".mobile-panel", {
          y: "-100%",
          duration: 0.6,
          ease: "power4.inOut",
        });
      } else {
        tl.to(".left-panel", {
          y: "-100%",
          duration: 0.6,
          ease: "power4.inOut",
        });
        tl.to(
          ".right-panel",
          { y: "100%", duration: 0.6, ease: "power4.inOut" },
          "<"
        );
      }
    }
  }, [isMenuOpen]);

  return (
    <div className="w-full grid grid-rows-[auto,1fr] text-white font-bold tracking-widest overflow-x-hidden">
      {/* Header */}
      <header
        className={`z-50 flex justify-between items-center px-6 py-4 fixed top-0 left-0 w-full transition-colors duration-500 ${
          isMenuOpen ? "bg-transparent" : ""
        }`}
      >
        {/* Logo + Company Name */}
        <div
          className={`flex items-center gap-3 transition-opacity duration-500 ${
            isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white text-2xl font-bold shadow-lg">
            O
          </div>
          <span className="text-xl text-black font-semibold tracking-wide ">
            Invent OG
          </span>
        </div>

        {/* Hamburger Button */}
        <div
          className="container relative w-12 h-12 cursor-pointer z-50 flex flex-col justify-center items-center"
          onClick={toggleHamburger}
        >
          {[0, 1].map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) spanRefs.current[i] = el;
              }}
              className="block w-5 h-0.5 my-1 bg-white transition-all duration-300"
            ></span>
          ))}
          {/* Pulse */}
          <span className="absolute w-16 h-16 rounded-full bg-white opacity-50 animate-ping -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
        </div>
      </header>

      {/* Menu */}
      <nav className="absolute inset-0 z-40 overflow-hidden pointer-events-none">
        {/* Desktop Panels */}
        <div className="hidden md:block">
          <div className="left-panel absolute left-0 top-0 w-1/2 h-full bg-[#ffffff] -translate-y-full" />
          <div className="right-panel absolute left-1/2 top-0 w-1/2 h-full bg-[#171817] translate-y-full" />
        </div>

        {/* Mobile Single Panel */}
        <div className="mobile-panel md:hidden absolute top-0 left-0 w-full h-full bg-[#d6d5d5] -translate-y-full" />

        {/* Menu items */}
        <ul className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center md:items-start md:pl-[10%] space-y-6 z-50 pointer-events-auto">
          {["Work", "About", "Services", "Contact"].map((item, i) => (
            <li
              key={i}
              className="menu-item text-[10vw] md:text-[8vmin] font-bold cursor-pointer relative text-black perspective-[1000px]"
              style={{
                opacity: 0,
                transform: "translateY(50px) rotateX(15deg)",
              }}
            >
              <span className="block transition-transform duration-500 ease-out hover:-rotateX-10 hover:translateY-[-5px] hover:text-gray-600">
                {item}
              </span>
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black opacity-50"></span>
            </li>
          ))}
        </ul>

        {/* Big title (hidden on mobile) */}
        <div className="hidden md:block menu-title absolute bottom-0 right-0 text-[12vw] font-black text-[#252525] leading-none z-50 pointer-events-auto">
          <span className="block opacity-0 -translate-x-12">KEY</span>
          <span className="block opacity-0 translate-x-12">FRAME</span>
          <span className="block opacity-0 -translate-x-12">RS</span>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
