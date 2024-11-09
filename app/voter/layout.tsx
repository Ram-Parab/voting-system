import Link from 'next/link'

export default function VoterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-blue-600 text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Voter Portal</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href="/voter/register" className="block py-2 px-4 hover:bg-blue-700 rounded">
                Register
              </Link>
            </li>
            <li>
              <Link href="/voter/elections" className="block py-2 px-4 hover:bg-blue-700 rounded">
                Elections
              </Link>
            </li>
            <li>
              <Link href="/voter/results" className="block py-2 px-4 hover:bg-blue-700 rounded">
                Results
              </Link>
            </li>
            <li>
              <Link href="/voter/registration-status-pending" className="block py-2 px-4 hover:bg-blue-700 rounded">
                Track Status
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