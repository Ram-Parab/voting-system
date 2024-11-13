'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Candidate {
  name: string
  party: string
}

const mockElections = [
  { id: 1, name: 'Maharashtra State Assembly Election 2024', date: '2024-11-20', status: 'Upcoming' },
]

export default function ManageElections() {
  const [electionTitle, setElectionTitle] = useState('')
  const [electionDate, setElectionDate] = useState('')
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [newCandidateName, setNewCandidateName] = useState('')
  const [newCandidateParty, setNewCandidateParty] = useState('')

  const addCandidate = () => {
    if (newCandidateName && newCandidateParty) {
      setCandidates([...candidates, { name: newCandidateName, party: newCandidateParty }])
      setNewCandidateName('')
      setNewCandidateParty('')
    }
  }

  const removeCandidate = (index: number) => {
    setCandidates(candidates.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Election created:', { electionTitle, electionDate, candidates })
    setElectionTitle('')
    setElectionDate('')
    setCandidates([])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Elections</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Existing Elections</CardTitle>
          <CardDescription>View and manage current elections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockElections.map((election) => (
              <div key={election.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{election.name}</h3>
                  <p className="text-sm text-gray-500">Date: {election.date}</p>
                  <p className="text-sm text-gray-500">Status: {election.status}</p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline">Edit</Button>
                  <Button variant="destructive">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Create New Election</CardTitle>
            <CardDescription>Set up a new election and add candidates</CardDescription>
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
                  {candidates.map((candidate, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-2">{candidate.name}</td>
                      <td>{candidate.party}</td>
                      <td className="text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => removeCandidate(index)}
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
            <Button type="submit">Create Election</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}