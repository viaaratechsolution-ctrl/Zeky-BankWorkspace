import React, { useRef } from 'react';
import { Wifi, Signal, BatteryMedium } from 'lucide-react';
import { Language } from '../types';

interface DeviceFrameProps {
  children: React.ReactNode;
  language: Language;
  currentTime?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  isFocusMode?: boolean;
  bottomNav?: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  language,
  currentTime = '9:41',
  onSwipeLeft,
  onSwipeRight,
  isFocusMode = false,
  bottomNav,
}) => {
  const isRtl = language === 'ar';
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        // Swiped Left
        if (isRtl) {
          if (onSwipeLeft) onSwipeLeft();
        } else {
          if (onSwipeRight) onSwipeRight();
        }
      } else {
        // Swiped Right
        if (isRtl) {
          if (onSwipeRight) onSwipeRight();
        } else {
          if (onSwipeLeft) onSwipeLeft();
        }
      }
    }
  };

  return (
    <div
      className="w-[360px] h-[740px] min-w-[360px] min-h-[740px] max-w-[360px] max-h-[740px] shrink-0 touch-pan-y select-none mx-auto relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative mx-auto w-[360px] h-[740px] shrink-0">
        {/* Glow behind the phone */}
        <div
          className="pointer-events-none absolute -inset-10 rounded-[4rem] bg-gradient-brand opacity-20 blur-3xl"
          aria-hidden="true"
        />

        {/* Side physical buttons */}
        <span
          className="absolute -left-[3px] top-28 h-8 w-[3px] rounded-l bg-zinc-700"
          aria-hidden="true"
        />
        <span
          className="absolute -left-[3px] top-40 h-14 w-[3px] rounded-l bg-zinc-700"
          aria-hidden="true"
        />
        <span
          className="absolute -left-[3px] top-56 h-14 w-[3px] rounded-l bg-zinc-700"
          aria-hidden="true"
        />
        <span
          className="absolute -right-[3px] top-44 h-20 w-[3px] rounded-r bg-zinc-700"
          aria-hidden="true"
        />

        {/* Outer Bezel */}
        <div className="relative w-[360px] h-[740px] min-h-[740px] max-h-[740px] rounded-[3.25rem] bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-700 p-[3px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] flex flex-col shrink-0">
          <div className="w-full h-full rounded-[3.1rem] bg-zinc-950 p-[10px] flex flex-col shrink-0">
            {/* Display screen fixed container: 334px x 714px */}
            <div className="relative flex flex-col w-[334px] h-[714px] min-w-[334px] max-w-[334px] min-h-[714px] max-h-[714px] shrink-0 overflow-hidden rounded-[2.5rem] bg-[#f5f7f9] text-[#111827] shadow-inner">
              {/* Status Bar: 44px fixed */}
              <div className="relative flex h-11 shrink-0 items-center justify-between bg-[#f5f7f9] px-7 pt-1 text-[13px] font-semibold text-[#111827] select-none z-30">
                <span className="tabular-nums font-mono text-[12px]">{currentTime}</span>

                {/* Dynamic Island */}
                <span
                  className="absolute left-1/2 top-2 h-[24px] w-[92px] -translate-x-1/2 rounded-full bg-black shadow-sm"
                  aria-hidden="true"
                />

                {/* Status Icons */}
                <span className="flex items-center gap-1" aria-hidden="true">
                  <Signal className="size-3.5" />
                  <Wifi className="size-3.5" />
                  <BatteryMedium className="size-4" />
                </span>
              </div>

              {/* Viewport Screen Content: 650px fixed (714px - 44px status - 20px home bar) */}
              <div
                dir={isRtl ? 'rtl' : 'ltr'}
                className="relative w-[334px] h-[650px] min-w-[334px] max-w-[334px] min-h-[650px] max-h-[650px] flex-1 min-h-0 overflow-hidden flex flex-col bg-[#f5f7f9]"
              >
                <div className="flex-1 min-h-0 flex flex-col overflow-hidden w-full h-full relative">
                  {children}
                </div>
                {bottomNav}
              </div>

              {/* Home Indicator: 20px fixed */}
              <div
                className="flex h-5 shrink-0 items-start justify-center bg-white select-none z-30"
                aria-hidden="true"
              >
                <span className="mt-1.5 h-1 w-28 rounded-full bg-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
