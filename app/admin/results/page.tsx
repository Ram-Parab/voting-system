'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const mockElections = [
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

export default function AdminResults() {
  const [selectedElection, setSelectedElection] = useState(mockElections[0])

  const handleExport = () => {
    console.log('Exporting results for:', selectedElection.name)
    // Here you would implement the logic to export the results
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">View Election Results</h1>
      <div className="flex justify-between items-center">
        <Select
          value={selectedElection.id.toString()}
          onValueChange={(value) => setSelectedElection(mockElections.find(e => e.id.toString() === value)!)}
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select an election" />
          </SelectTrigger>
          <SelectContent>
            {mockElections.map((election) => (
              <SelectItem key={election.id} value={election.id.toString()}>
                {election.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleExport}>Export Results</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{selectedElection.name}</CardTitle>
          <CardDescription>Election Date: {selectedElection.date}</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Candidate</th>
                <th className="text-left">Party</th>
                <th className="text-right">Votes</th>
                <th className="text-right">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {selectedElection.results.map((result, index) => {
                const totalVotes = selectedElection.results.reduce((sum, r) => sum + r.votes, 0)
                const percentage = ((result.votes / totalVotes) * 100).toFixed(2)
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-2">{result.name}</td>
                    <td>{result.party}</td>
                    <td className="text-right">{result.votes.toLocaleString()}</td>
                    <td className="text-right">{percentage}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}