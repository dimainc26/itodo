import React from "react";
import { Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");
const height = 80;
const radius = 36;

export default function CurvedTabBackground() {
  const centerX = width / 2;
  const curveWidth = radius * 2 + 16;

  const fabWidth = 80;
  const left = centerX - curveWidth + fabWidth / 2;
  const right = centerX + curveWidth - fabWidth / 2;
  const arcHeight = 40;

  const borderRadius = 16;

  const d = `
    M${borderRadius} 0
    H${left}
    C${left + 10} 0, ${left + 10} ${arcHeight}, ${centerX} ${arcHeight}
    C${right - 10} ${arcHeight}, ${right - 10} 0, ${right} 0
    H${width - borderRadius}
    A${borderRadius} ${borderRadius} 0 0 1 ${width} ${borderRadius}
    V${height}
    H0
    V${borderRadius}
    A${borderRadius} ${borderRadius} 0 0 1 ${borderRadius} 0
    Z
  `;

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        position: "absolute",
        bottom: 0,
        zIndex: 1,
      }}
      pointerEvents="none"
    >
      <Path fill="#EEE9FF" d={d} />
    </Svg>
  );
}
