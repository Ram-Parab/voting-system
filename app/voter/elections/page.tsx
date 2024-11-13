'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const mockElections = [
  {
    id: 1,
    title: 'Maharashtra State Assembly Election 2024',
    description: 'Vote for the next MLA of your constituency',
    candidates: [
      { id: 1, name: 'Devendra Fadnavis', party: 'BJP' },
      { id: 2, name: 'Eknath Shinde', party: 'SS' },
      { id: 3, name: 'Uddhav Thackrey', party: 'SS UBT' },
    ],
  },
  // Add more mock elections as needed
]

export default function VoterElections() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleVoteSubmit = () => {
    // Here you would typically send the vote to your backend
    console.log(`Vote submitted for candidate: ${selectedCandidate}`)
    setIsDialogOpen(false)
    // Reset selection after voting
    setSelectedCandidate(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Current Elections</h1>
      {mockElections.map((election) => (
        <Card key={election.id} className="mb-6">
          <CardHeader>
            <CardTitle>{election.title}</CardTitle>
            <CardDescription>{election.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup onValueChange={setSelectedCandidate} value={selectedCandidate || undefined}>
              {election.candidates.map((candidate) => (
                <div key={candidate.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={candidate.id.toString()} id={`candidate-${candidate.id}`} />
                  <Label htmlFor={`candidate-${candidate.id}`}>{candidate.name} - {candidate.party}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button disabled={!selectedCandidate}>Submit Vote</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Your Vote</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to submit your vote? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <p className="py-4">
                  You are voting for: {selectedCandidate && 
                    election.candidates.find(c => c.id.toString() === selectedCandidate)?.name
                  }
                </p>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleVoteSubmit}>Confirm Vote</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}