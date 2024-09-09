import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, useAnimation, useScroll, useMotionValueEvent  } from "framer-motion";

const Dropdown = ({ children, Content }) => {
  const [open, setOpen] = useState(false);
  const showFlyout = Content && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit hidden xl:block"
    >
      <div className="cursor-pointer">
        <span 
          className={`uppercase tracking-widest transition-colors duration-300 hover:text-indigo-300 ${ open ? 'text-indigo-300' : '' }`}>
          {children}
        </span>
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
        />
      </div>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-bg2 border-greyBorder border-2"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white tracking-[.25em]" />
            <Content />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function Nav({ topics }) {
  const [lastY, setLastY] = useState(0);
  const [isShow, setIsShow] = useState(true);
  const controls = useAnimation();

  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setIsShow(value == 0 || value < lastY);
    setLastY(value);
  });

  useEffect(() => {
    controls.start({
      y: isShow ? '0px' : '-60px',
      transition: { duration: 0.3, ease: 'easeInOut' },
    });
  }, [isShow, controls]);

  return (
    <>
      <motion.div
        animate={controls}
        className={`flex sans font-semibold py-4 justify-evenly fixed top-0 w-full border-b-2 border-greyBorder backdrop-blur-md z-[99]`}
      >
        {Object.entries(topics).map(([category, subtopics]) => (
          <Dropdown
            key={category}
            Content={() => {
              return (
                <div className="text-center p-3 shadow-xl whitespace-nowrap">
                  {Object.entries(subtopics).map(([title, { path, element }]) => (
                    <a key={path} href={`/${element ? path : ""}`} className="block">
                      <p className="m-2 font-normal text-[rgba(255,255,255,0.5)] hover:text-[rgba(122,118,255,1)] transition-colors duration-300">{title}</p>
                    </a>
                  ))}
                </div>
              );
            }}
          >
            {category}
          </Dropdown>
        ))}
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </motion.div>
    </>
  );
}

export default Nav