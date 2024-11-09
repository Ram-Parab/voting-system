'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

type ElectionStatus = 'live' | 'final' | 'pending'

interface Candidate {
  name: string
  party: string
  votes: number
}

interface Election {
  id: number
  name: string
  date: string
  status: ElectionStatus
  results: Candidate[]
}

const mockElections: Election[] = [
  {
    id: 1,
    name: 'Presidential Election 2024',
    date: '2024-11-03',
    status: 'live',
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
    status: 'final',
    results: [
      { name: 'Alice Brown', party: 'Progressive Party', votes: 50000 },
      { name: 'Charlie Davis', party: 'Conservative Party', votes: 48000 },
    ],
  },
  {
    id: 3,
    name: 'Referendum on Public Transport',
    date: '2024-09-01',
    status: 'pending',
    results: [
      { name: 'Yes', party: 'For', votes: 0 },
      { name: 'No', party: 'Against', votes: 0 },
    ],
  },
]

export default function VoterResults() {
  const [selectedElection, setSelectedElection] = useState<Election>(mockElections[0])

  const getStatusBadge = (status: ElectionStatus) => {
    switch (status) {
      case 'live':
        return <Badge variant="default">Live</Badge>
      case 'final':
        return <Badge variant="secondary">Final</Badge>
      case 'pending':
        return <Badge variant="outline">Pending</Badge>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Election Results</h1>
      <div className="flex justify-between items-center mb-6">
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
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{selectedElection.name}</CardTitle>
            {getStatusBadge(selectedElection.status)}
          </div>
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
                const percentage = totalVotes > 0 ? ((result.votes / totalVotes) * 100).toFixed(2) : '0.00'
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