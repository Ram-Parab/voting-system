import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const mockResults = [
  {
    id: 1,
    name: 'Presidential Election 2024',
    date: '2024-11-03',
    results: [
      { name: 'John Doe', party: 'Democratic Party', votes: 15000000 },
      { name: 'Jane Smith', party: 'Republican Party', votes: 14500000 },
      { name: 'Bob Johnson', party: 'Independent', votes: 1500000 },
    ],
  },
  {
    id: 2,
    name: 'Local Council Election',
    date: '2024-05-15',
    results: [
      { name: 'Alice Brown', party: 'Progressive Party', votes: 50000 },
      { name: 'Charlie Davis', party: 'Conservative Party', votes: 48000 },
    ],
  },
]

export default function VoterResults() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Election Results</h1>
      {mockResults.map((election) => (
        <Card key={election.id}>
          <CardHeader>
            <CardTitle>{election.name}</CardTitle>
            <CardDescription>Election Date: {election.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Candidate</th>
                  <th className="text-left">Party</th>
                  <th className="text-right">Votes</th>
                </tr>
              </thead>
              <tbody>
                {election.results.map((result, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-2">{result.name}</td>
                    <td>{result.party}</td>
                    <td className="text-right">{result.votes.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}