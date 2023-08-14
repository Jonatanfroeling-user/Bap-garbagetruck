import { useEffect, useRef, useState } from "react";

const inactivityDuration = 3 * 1000; // seconds

const useActivity = (elm: any = window) => {
  const inactivityTimeoutRef = useRef<any>(null);
  const [isInactive, setIsInactive] = useState(false);

  const handleInactive = () => {
    setIsInactive(true);
  };

  const handleUserActivity = () => {
    clearTimeout(inactivityTimeoutRef.current);
    inactivityTimeoutRef.current = setTimeout(
      handleInactive,
      inactivityDuration
    );
    setIsInactive(false);
  };

  useEffect(() => {
    if (!elm) return;
    elm.addEventListener("mousemove", handleUserActivity);
    elm.addEventListener("keydown", handleUserActivity);
    elm.addEventListener("scroll", handleUserActivity);

    inactivityTimeoutRef.current = setTimeout(
      handleInactive,
      inactivityDuration
    );

    return () => {
      elm.removeEventListener("mousemove", handleUserActivity);
      elm.removeEventListener("keydown", handleUserActivity);
      elm.removeEventListener("scroll", handleUserActivity);
      clearTimeout(inactivityTimeoutRef.current);
    };
  }, [elm]);

  const stopListener = () => {
    setIsInactive(true);
  };

  const startListener = () => {
    setIsInactive(false);
    clearTimeout(inactivityTimeoutRef.current);
    inactivityTimeoutRef.current = setTimeout(
      handleInactive,
      inactivityDuration
    );
  };

  return { isInactive, stopListener, startListener };
};

export default useActivity;
