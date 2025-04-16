import React, { useEffect, useState } from 'react'
import { set } from 'zod';

function useResendCode() {
    const retryDelays = [60, 300, 3600, 86400];
    const [attempts, setAttempts] = useState<number>(0);
    const [lastSentAt, setLastSentAt] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(0);
  
    useEffect(() => {
      const storedAttempts = parseInt(
        localStorage.getItem("otpAttempts") || "0",
        10
      );
      const storedLastSentAt = parseInt(
        localStorage.getItem("otpLastSentAt") || "0",
        10
      );
  
      setAttempts(storedAttempts);
  
      if (storedLastSentAt > 0) {
        setLastSentAt(storedLastSentAt);
      } else {
        // أول مرة يدخل المستخدم → نبدأ من الآن
        const now = Math.floor(Date.now() / 1000);
        localStorage.setItem("otpLastSentAt", now.toString());
        setLastSentAt(now);
      }
    }, []);
  
    // مؤقت العد التنازلي
    useEffect(() => {
      if (!lastSentAt) return;
  
      const delay = retryDelays[Math.min(attempts, retryDelays.length - 1)];
      const interval = setInterval(() => {
        const now = Math.floor(Date.now() / 1000);
        const secondsPassed = now - lastSentAt;
        const remaining = delay - secondsPassed;
  
        setTimeLeft(Math.max(0, remaining));
  
        if (remaining <= 0) clearInterval(interval);
      }, 1000);
  
      return () => clearInterval(interval);
    }, [lastSentAt, attempts]);
  
    const handleReSendCode = () => {
      const now = Math.floor(Date.now() / 1000);
      const newAttempts = attempts + 1;
      setLastSentAt(now);
      setAttempts(newAttempts);
      localStorage.setItem("otpAttempts", newAttempts.toString());
      localStorage.setItem("otpLastSentAt", now.toString());
    };
  
    
    const handleReset = (): void => {
      localStorage.removeItem('otpAttempts');
      localStorage.removeItem('otpLastSentAt');
      setAttempts(0);
      setLastSentAt(null);
      setTimeLeft(0);
    };
    
    return {
        attempts,
        lastSentAt,
        timeLeft,
        handleReSendCode,
        handleReset,
        setAttempts,
        setLastSentAt,
        setTimeLeft,
        retryDelays,
    }
}

export default useResendCode