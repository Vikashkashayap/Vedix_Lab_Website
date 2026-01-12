import { useCallback } from 'react';

interface AudioFeedbackOptions {
  volume?: number;
  enableHaptic?: boolean;
}

export const useAudioFeedback = (options: AudioFeedbackOptions = {}) => {
  const { volume = 0.3, enableHaptic = true } = options;

  const playSound = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      // Silently fail if audio context is not available
      console.warn('Audio feedback not available:', error);
    }
  }, [volume]);

  const triggerHaptic = useCallback(() => {
    if (enableHaptic && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }, [enableHaptic]);

  const clickSound = useCallback(() => {
    playSound(800, 0.1, 'sine');
    triggerHaptic();
  }, [playSound, triggerHaptic]);

  const hoverSound = useCallback(() => {
    playSound(600, 0.05, 'triangle');
  }, [playSound]);

  const successSound = useCallback(() => {
    playSound(1000, 0.2, 'sine');
    setTimeout(() => playSound(1200, 0.2, 'sine'), 100);
    triggerHaptic();
    setTimeout(() => triggerHaptic(), 100);
  }, [playSound, triggerHaptic]);

  const errorSound = useCallback(() => {
    playSound(300, 0.3, 'sawtooth');
    triggerHaptic();
  }, [playSound, triggerHaptic]);

  return {
    clickSound,
    hoverSound,
    successSound,
    errorSound,
    triggerHaptic
  };
};
