import { animArr } from "../Store/store";

export const allAnimationsStopped = (): boolean => {
  if (animArr.length === 0) return false;
  return animArr.every(({ animation }) => {
    return (
      animation.playState === "paused" || animation.playState === "finished"
    );
  });
};
