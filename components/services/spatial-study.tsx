"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import styles from "./spatial-study.module.css";

export default function SpatialStudy() {
  const [elevation, setElevation] = useState(false);
  const reduced = useReducedMotion();
  const id = useId();
  const duration = reduced ? 0 : .65;
  const transition = { duration, ease: [.22, 1, .36, 1] as const };
  return (
    <div className={styles.study}>
      <div className={styles.topline}><span>Two ways of seeing</span><span aria-live="polite" aria-atomic="true">{elevation ? "02 / Elevation" : "01 / Plan"}</span></div>
      <svg id={id} className={styles.drawing} viewBox="80 12 480 344" role="img" aria-label={elevation ? "Illustrative front elevation of a courtyard house, with a flat roof, two windows, and a red entrance." : "Illustrative floor plan of a courtyard house, with rooms around a central red courtyard."}>
        <g className={styles.guides} fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M80 306H560 M112 38V326 M528 38V326" strokeDasharray="3 7" />
          <path d="M104 54H120 M112 46V62 M520 54H536 M528 46V62" />
        </g>
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter">
          <motion.path initial={false} animate={{ d: elevation ? "M112 146 L528 146 L528 290 L112 290 Z" : "M168 54 L472 54 L472 306 L168 306 Z" }} transition={transition} />
          <motion.path initial={false} animate={{ d: elevation ? "M100 134 L540 134 L540 146 L100 146 Z" : "M156 42 L484 42 L484 318 L156 318 Z" }} transition={transition} className={styles.secondary} />
          <motion.path initial={false} animate={{ d: elevation ? "M100 290 L540 290 L540 302 L100 302 Z" : "M168 306 L472 306 L472 318 L168 318 Z" }} transition={transition} />
          <motion.g initial={false} animate={{ opacity: elevation ? 0 : 1 }} transition={{ duration: reduced ? 0 : .18, delay: elevation || reduced ? 0 : .3 }}>
            <path d="M268 54V128 M268 156V190 M168 190H280 M360 190H472 M372 54V128 M372 156V190 M268 190V240 M268 270V306 M372 190V240 M372 270V306" />
            <path d="M280 190V214 M280 214A24 24 0 0 0 304 190 M360 190V214 M360 214A24 24 0 0 1 336 190" className={styles.secondary} strokeWidth="1" />
            <path d="M186 78H248V116H186Z M392 78H454V116H392Z M190 216H244V286H190Z M396 216H450V286H396Z" className={styles.secondary} strokeWidth="1" />
            <path d="M188 104H246 M394 104H452 M188 248H246 M394 248H452" className={styles.secondary} strokeWidth="1" />
          </motion.g>
          <motion.path initial={false} animate={{ d: elevation ? "M292 204 L348 204 L348 290 L292 290 Z" : "M290 98 L350 98 L350 160 L290 160 Z" }} transition={transition} className={styles.redSpace} />
          <motion.g initial={false} animate={{ opacity: elevation ? 1 : 0 }} transition={{ duration: reduced ? 0 : .2, delay: elevation && !reduced ? .28 : 0 }}>
            <path d="M156 194H244V252H156Z M396 194H484V252H396Z M200 194V252 M440 194V252" />
            <path d="M136 146V290 M504 146V290 M276 146V290 M364 146V290" className={styles.secondary} strokeWidth="1" />
            <path d="M300 216V280 M308 216V280 M316 216V280 M324 216V280 M332 216V280 M340 216V280" className={styles.redLines} strokeWidth="1" />
            <path d="M88 314H552" strokeWidth="1" />
          </motion.g>
        </g>
        <g className={styles.annotations} fill="currentColor">
          <text x="320" y="346" textAnchor="middle">{elevation ? "FRONT ELEVATION" : "GROUND PLAN"}</text>
          <text x="112" y="28">SU.EN / STUDY 01</text>
          <text x="528" y="28" textAnchor="end">NOT TO SCALE</text>
        </g>
      </svg>
      <div className={styles.bottomline}>
        <p>A change in perspective.</p>
        <button type="button" className={styles.toggle} aria-controls={id} aria-pressed={elevation} aria-label="Show elevation instead of plan" onClick={() => setElevation(value => !value)}>
          <span className={styles.redDot} aria-hidden="true" /><span>{elevation ? "Back to plan" : "See elevation"}</span><span className={styles.switchArrow} aria-hidden="true">↔</span>
        </button>
      </div>
      <p className={styles.note}>An illustrative spatial study, not a project drawing.</p>
    </div>
  );
}

