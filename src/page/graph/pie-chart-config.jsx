import React from "react";

export const COLORS = {
  Düşük: "#FF6B6B", // Kırmızımsı turuncu
  Orta: "#FFD93D",  // Altın sarısı
  Yüksek: "#6BCB77", // Yumuşak yeşil
};

const RADIAN = Math.PI / 180;

export const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={13}
      fontWeight="600"
      style={{
        textShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
        letterSpacing: "0.3px",
      }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
