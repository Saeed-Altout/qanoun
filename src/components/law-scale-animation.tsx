"use client";

import Lottie from "lottie-react";
import lawAnimation from "@/animations/law-scale.json";

export function LawScaleAnimation() {
  return (
    <Lottie
      animationData={lawAnimation}
      loop={true}
      style={{ width: 400, height: 400 }}
      className="mx-auto"
    />
  );
}
