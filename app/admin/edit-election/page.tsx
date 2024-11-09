'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Candidate {
  id: number
  name: string
  party: string
}

interface Election {
  id: number
  title: string
  date: string
  candidates: Candidate[]
}

// Mock data for an existing election
const mockElection: Election = {
  id: 1,
  title: 'Presidential Election 2024',
  date: '2024-11-03',
  candidates: [
    { id: 1, name: 'John Doe', party: 'Democratic Party' },
    { id: 2, name: 'Jane Smith', party: 'Republican Party' },
    { id: 3, name: 'Bob Johnson', party: 'Independent' },
  ],
}

export default function EditElection() {
  const [electionTitle, setElectionTitle] = useState(mockElection.title)
  const [electionDate, setElectionDate] = useState(mockElection.date)
  const [candidates, setCandidates] = useState<Candidate[]>(mockElection.candidates)
  const [newCandidateName, setNewCandidateName] = useState('')
  const [newCandidateParty, setNewCandidateParty] = useState('')

  const addCandidate = () => {
    if (newCandidateName && newCandidateParty) {
      const newCandidate: Candidate = {
        id: Math.max(0, ...candidates.map(c => c.id)) + 1,
        name: newCandidateName,
        party: newCandidateParty,
      }
      setCandidates([...candidates, newCandidate])
      setNewCandidateName('')
      setNewCandidateParty('')
    }
  }

  const removeCandidate = (id: number) => {
    setCandidates(candidates.filter(candidate => candidate.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated data to your backend
    console.log('Election updated:', { id: mockElection.id, electionTitle, electionDate, candidates })
    // In a real application, you might redirect to the manage elections page after successful update
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Election</h1>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Edit Election Details</CardTitle>
            <CardDescription>Update the election information and candidates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Election Title</Label>
              <Input
                id="title"
                value={electionTitle}
                onChange={(e) => setElectionTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Election Date</Label>
              <Input
                id="date"
                type="date"
                value={electionDate}
                onChange={(e) => setElectionDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Candidates</Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Candidate Name"
                  value={newCandidateName}
                  onChange={(e) => setNewCandidateName(e.target.value)}
                />
                <Input
                  placeholder="Party Name"
                  value={newCandidateParty}
                  onChange={(e) => setNewCandidateParty(e.target.value)}
                />
                <Button type="button" onClick={addCandidate} className="shrink-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <ScrollArea className="h-[200px] w-full border rounded-md p-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Name</th>
                    <th className="text-left">Party</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate) => (
                    <tr key={candidate.id} className="border-t">
                      <td className="py-2">{candidate.name}</td>
                      <td>{candidate.party}</td>
                      <td className="text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => removeCandidate(candidate.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button type="submit">Update Election</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}