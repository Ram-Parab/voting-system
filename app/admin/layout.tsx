import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-green-600 text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Admin Portal</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href="/admin/manage-elections" className="block py-2 px-4 hover:bg-green-700 rounded">
                Manage Elections
              </Link>
            </li>
            <li>
              <Link href="/admin/manage-voters" className="block py-2 px-4 hover:bg-green-700 rounded">
                Manage Voters
              </Link>
            </li>
            <li>
              <Link href="/admin/results" className="block py-2 px-4 hover:bg-green-700 rounded">
                View Results
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}