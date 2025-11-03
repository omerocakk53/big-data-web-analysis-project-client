import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useData } from "../../hooks/data";
import StatCard from "./stat-card";
import { COLORS, renderCustomizedLabel } from "./pie-chart-config";

const Main = () => {
  const { data, loading, error } = useData();

  if (loading)
    return (
      <div className="p-4 text-center text-gray-400 animate-pulse">
        Analiz verileri yükleniyor...
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-center text-red-500 font-semibold">
        Hata: {error.message}
      </div>
    );

  if (!data || !data.analysis_result)
    return (
      <div className="p-4 text-center text-yellow-500">
        Analiz verisi bulunamadı.
      </div>
    );

  const analysis = data.analysis_result;

  const pieChartData = Object.keys(analysis.memnuniyet_oranlari_yuzde).map(
    (key) => ({
      name: key,
      value: analysis.memnuniyet_oranlari_yuzde[key],
    })
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-100 text-center">
        Analiz Özeti
      </h2>
      {/* Ürün & Bölge Listeleri */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 shadow-xl rounded-xl flex items-center justify-between px-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard
            title="En Çok Satan Ürün"
            value={analysis.en_cok_satan_urun}
            color="text-blue-500"
          />
          {analysis.ürün_adi.map(
            (ürün, i) =>
              analysis.en_cok_satan_urun !== ürün && (
                <StatCard
                  key={i}
                  title=""
                  value={ürün}
                  color="text-purple-500"
                />
              )
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-center text-gray-200">
            Genel Müşteri Memnuniyet Oranları (%)
          </h3>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <PieChart>
                <defs>
                  <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6BCB77" stopOpacity={1} />
                    <stop offset="100%" stopColor="#4BB543" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient id="colorMedium" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFD93D" stopOpacity={1} />
                    <stop offset="100%" stopColor="#FFC300" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF6B6B" stopOpacity={1} />
                    <stop offset="100%" stopColor="#E63946" stopOpacity={0.8} />
                  </linearGradient>
                </defs>

                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={110}
                  innerRadius={60}
                  stroke="#1f2937"
                  strokeWidth={2}
                  dataKey="value"
                  nameKey="name"
                >
                  {pieChartData.map((entry, index) => {
                    const fill =
                      entry.name === "Yüksek"
                        ? "url(#colorHigh)"
                        : entry.name === "Orta"
                        ? "url(#colorMedium)"
                        : "url(#colorLow)";
                    return <Cell key={`cell-${index}`} fill={fill} />;
                  })}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend
                  iconType="circle"
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{
                    color: "#f3f4f6",
                    fontSize: "0.9rem",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard
            title="En Çok Satış Yapan Bölge"
            value={analysis.en_cok_satan_bolge}
            color="text-green-500"
          />
          {analysis.bölge_adi.map(
            (bölge, i) =>
              analysis.en_cok_satan_bolge !== bölge && (
                <StatCard
                  key={i}
                  title=""
                  value={bölge}
                  color="text-indigo-500"
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
