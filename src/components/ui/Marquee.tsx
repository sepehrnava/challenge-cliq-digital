/* eslint-disable no-inner-declarations */
/* eslint-disable no-constant-condition */
/* eslint-disable no-await-in-loop */

"use client";

import React from "react";

import { cn, sleep } from "@/lib/utils";

let hover = false;

export default function Marquee({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) {
  const marquee = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    const marqueeElement = marquee.current;

    if (marqueeElement) {
      const wrapperWidth = marqueeElement.clientWidth;
      const contentElement = marqueeElement.querySelector("span");
      const contentWidth = contentElement!.offsetWidth;

      if (wrapperWidth < contentWidth) {
        const scrollWidth = contentWidth - wrapperWidth - 1;
        marqueeElement.onmouseover = () => {
          hover = true;
        };

        marqueeElement.onmouseout = () => {
          hover = false;
        };

        async function scrollMarquee() {
          let delayDuration: number;
          await sleep(2000);
          while (true) {
            delayDuration = 30;

            while (marqueeElement!.scrollLeft < scrollWidth) {
              if (hover) break;
              marqueeElement!.scrollLeft += 1;
              await sleep(delayDuration);
            }
            await sleep(1000);
            delayDuration = 20;
            while (marqueeElement!.scrollLeft > 0) {
              if (hover) break;
              marqueeElement!.scrollLeft -= 1;
              await sleep(delayDuration);
            }

            await sleep(2500);
          }
        }
        scrollMarquee();
      }
    }
  }, []);

  return (
    <p
      ref={marquee}
      className={cn(
        "whitespace-nowrap overflow-x-auto no-scrollbar",
        className,
      )}
      {...props}
    >
      <span>{props.children}</span>
    </p>
  );
}
