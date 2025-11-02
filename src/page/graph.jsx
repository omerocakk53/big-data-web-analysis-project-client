import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useData } from "../hooks/data"; // Veri hook'unuz

// --- 1. İstatistik Kartı (KPI) Bileşeni ---
// "En Çok Satan Ürün" gibi tekil verileri göstermek için yeniden kullanılabilir bileşen.
const StatCard = ({ title, value, color }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
    <h3 className="text-base font-medium text-gray-500 uppercase tracking-wide">
      {title}
    </h3>
    <p className={`text-3xl font-bold mt-2 ${color || "text-gray-900"}`}>
      {value}
    </p>
  </div>
);

// --- 2. Pasta Grafik Ayarları ---
// Python'dan gelen verinin sırasına göre renkleri ayarlayalım:
// { "Düşük": 36, "Yüksek": 34, "Orta": 30 }
const COLORS = {
  "Düşük": "#FF8042", // Turuncu
  "Yüksek": "#0088FE", // Mavi
  "Orta": "#00C49F", // Yeşil
};

// Yüzdeleri dilimlerin içine yazmak için özel etiket
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="font-bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// --- 3. Ana Dashboard Bileşeni ---
const GraphDashboard = () => {
  const { data, loading, error } = useData();

  if (loading) return <div className="p-4 text-center text-gray-500">Analiz verileri yükleniyor...</div>;
  if (error) return <div className="p-4 text-center text-red-600">Hata: {error.message}</div>;
  if (!data || !data.analysis_result) return <div className="p-4 text-center text-red-600">Analiz verisi bulunamadı.</div>;

  // Veriyi daha kolay erişim için bir değişkene atayalım
  const analysis = data.analysis_result;

  // PieChart verisini Recharts'in istediği formata dönüştür
  const pieChartData = Object.keys(analysis.memnuniyet_oranlari_yuzde).map(
    (key) => ({
      name: key,
      value: analysis.memnuniyet_oranlari_yuzde[key],
    })
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-200">Analiz Özeti</h2>

      {/* --- Üst Sıra: KPI Kartları --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard
          title="En Çok Satan Ürün"
          value={analysis.en_cok_satan_urun}
          color="text-blue-600"
        />
        <StatCard
          title="En Çok Satış Yapan Bölge"
          value={analysis.en_cok_satan_bolge}
          color="text-green-600"
        />
      </div>

      {/* --- Alt Sıra: Pasta Grafik --- */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
          Ürünlerin Yüzdelik Müşteri Memnuniyet Oranları (%)
        </h3>
        {/* ResponsiveContainer'ın çalışması için ebeveyn div'e bir yükseklik vermelisiniz */}
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={110} // Grafiğin boyutunu büyüttük
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {/* Her dilime (Cell) özel rengini ata */}
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.name] || "#8884d8"} // Renkleri isimle eşleştir
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default GraphDashboard;