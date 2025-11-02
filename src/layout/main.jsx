export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen text-red-400 bg-gray-600">
      <div className="flex flex-col flex-1 p-6">
        {children}
      </div>
    </div>
  )
}
