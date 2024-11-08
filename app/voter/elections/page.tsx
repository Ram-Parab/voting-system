'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

const mockElections = [
  {
    id: 1,
    name: 'Presidential Election 2024',
    startDate: '2024-11-03',
    endDate: '2024-11-03',
    candidates: [
      { id: 1, name: 'John Doe', party: 'Democratic Party' },
      { id: 2, name: 'Jane Smith', party: 'Republican Party' },
      { id: 3, name: 'Bob Johnson', party: 'Independent' },
    ],
  },
  {
    id: 2,
    name: 'Local Council Election',
    startDate: '2024-05-15',
    endDate: '2024-05-15',
    candidates: [
      { id: 4, name: 'Alice Brown', party: 'Progressive Party' },
      { id: 5, name: 'Charlie Davis', party: 'Conservative Party' },
    ],
  },
]

export default function Elections() {
  const [votes, setVotes] = useState<Record<number, number>>({})

  const handleVote = (electionId: number, candidateId: number) => {
    setVotes({ ...votes, [electionId]: candidateId })
  }

  const handleSubmit = (electionId: number) => {
    console.log(`Submitted vote for election ${electionId}: Candidate ${votes[electionId]}`)
    // Here you would typically send the vote to your backend
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Available Elections</h1>
      {mockElections.map((election) => (
        <Card key={election.id}>
          <CardHeader>
            <CardTitle>{election.name}</CardTitle>
            <CardDescription>
              {`Voting period: ${election.startDate} to ${election.endDate}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              onValueChange={(value) => handleVote(election.id, parseInt(value))}
              value={votes[election.id]?.toString()}
            >
              {election.candidates.map((candidate) => (
                <div key={candidate.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={candidate.id.toString()} id={`candidate-${candidate.id}`} />
                  <Label htmlFor={`candidate-${candidate.id}`}>
                    {candidate.name} - {candidate.party}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleSubmit(election.id)}
              disabled={!votes[election.id]}
            >
              Submit Vote
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}