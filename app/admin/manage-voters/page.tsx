'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const mockVoters = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'Pending' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'Approved' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', status: 'Rejected' },
  { id: 4, name: 'Diana Ross', email: 'diana@example.com', status: 'Pending' },
]

export default function ManageVoters() {
  const [voters, setVoters] = useState(mockVoters)
  const [searchTerm, setSearchTerm] = useState('')

  const handleStatusChange = (voterId: number, newStatus: string) => {
    setVoters(voters.map(voter => 
      voter.id === voterId ? { ...voter, status: newStatus } : voter
    ))
  }

  const filteredVoters = voters.filter(voter => 
    voter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voter.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Voters</h1>
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search voters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="grid gap-6">
        {filteredVoters.map((voter) => (
          <Card key={voter.id}>
            <CardHeader>
              <CardTitle>{voter.name}</CardTitle>
              <CardDescription>{voter.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Label htmlFor={`status-${voter.id}`}>Status:</Label>
                <Select
                  value={voter.status}
                  onValueChange={(value) => handleStatusChange(voter.id, value)}
                >
                  <SelectTrigger id={`status-${voter.id}`}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}