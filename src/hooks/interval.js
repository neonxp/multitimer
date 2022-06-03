import { useEffect, useRef } from "react";

const useInterval = (callback, interval, immediate) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = callback;
    }, [callback]);

    useEffect(() => {
      let cancelled = false;

      const fn = () => {
        ref.current(() => cancelled);
      };

      const id = setInterval(fn, interval);
      if (immediate) fn();

      return () => {
        cancelled = true;
        clearInterval(id);
      };
    }, [interval, immediate]);
  };

  export default useInterval;
