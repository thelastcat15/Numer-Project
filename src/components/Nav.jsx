import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Dropdown = ({ children, Content }) => {
  const [open, setOpen] = useState(false);
  const showFlyout = Content && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <div className="cursor-pointer">
        <span className={`${open ? 'text-[#7a76ff]' : ''} uppercase tracking-widest`}>
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
            className="absolute left-1/2 top-12 bg-[#0D0E0F] text-[#A2AAB8] border-[#282D33] border-2"
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

  return (
    <div className={`sans font-semibold py-4 flex justify-evenly border-b-2 border-[#282D33]`}>
      {Object.entries(topics).map(([category, subtopics]) => (
        <Dropdown
          key={category}
          Content={() => {
            return (
              <div className="text-center p-3 shadow-xl whitespace-nowrap">
                {Object.entries(subtopics).map(([title, { path, element }]) => (
                  <a key={path} href={`/${element ? path : ""}`} className="block">
                    <p className="m-2 hover:text-[#7a76ff] transition-colors duration-300">{title}</p>
                  </a>
                ))}
              </div>
            );
          }}
        >
          {category}
        </Dropdown>
      ))}
    </div>
  );
}

export default Nav