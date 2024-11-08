import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-blue-600">
          Digital Identity-Based Voting System
        </h1>
        <p className="mt-3 text-2xl text-gray-600">
          Secure, Transparent, and Accessible
        </p>
        <div className="flex mt-6 space-x-4">
          <Link href="/voter-login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Voter Portal
          </Link>
          <Link href="/admin/manage-elections" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Admin Portal
          </Link>
        </div>
      </main>
    </div>
  )
}