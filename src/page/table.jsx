import { useData } from "../hooks/data";

const TablePage = () => {
  const { data, loading, error } = useData();

  if (loading) return <div className="p-4 text-center text-gray-200">Yükleniyor...</div>;
  if (error) return <div className="p-4 text-center text-red-600">Hata: {error.message}</div>;
  if (!data) return <div className="p-4 text-center text-red-600">Veri bulunamadı.</div>;

  const formatCurrency = (number) =>
    new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(number);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-200">
        Ürün Satış Raporu
      </h2>
      <div className="shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-y-auto max-h-[70vh]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800 sticky top-0 z-10">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Ürün Adı
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Fiyat
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Satış Adedi
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Memnuniyet
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Bölge
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Tarih
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.data_table.map((item, index) => (
                <tr key={index} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.Ürün_Adı}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {formatCurrency(item.Fiyat)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.Satış_Adedi}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {/* Bonus Düzeltme: Python'dan artık 'Yüksek', 'Orta'
                      gibi metinler geldiği için '/ 5' kısmını kaldırdım.
                    */}
                    {item.Müşteri_Memnuniyeti}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.Bölge}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.Tarih || item.Tah}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TablePage;

