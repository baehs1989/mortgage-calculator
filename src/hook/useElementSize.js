import { useState, useEffect} from "react";

import {debounce} from '../util'

const useElementSize = (elementRef) => {
  const [size, setSize] = useState("l");

  useEffect(() => {
    const resizeEvent = () => {
      let size = "s";
      if (elementRef.current) {
        if (elementRef.current.offsetWidth > 600) {
          size = "l";
        } else if (elementRef.current.offsetWidth > 300) {
          size = "m";
        }
      }
      setSize(size);
    };

    resizeEvent();
    const debouncedFunction = debounce(resizeEvent, 200);
    window.addEventListener("resize", debouncedFunction);

    return () => {
      window.addEventListener("resize", debouncedFunction);
    };
  }, [elementRef]);

  return size;
};

export default useElementSize;
