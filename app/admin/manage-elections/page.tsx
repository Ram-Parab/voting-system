'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function ManageElections() {
  const [elections, setElections] = useState([
    { id: 1, name: 'Presidential Election 2024', startDate: '2024-11-03', endDate: '2024-11-03' },
    { id: 2, name: 'Local Council Election', startDate: '2024-05-15', endDate: '2024-05-15' },
  ])

  const [newElection, setNewElection] = useState({
    name: '',
    startDate: '',
    endDate: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewElection({ ...newElection, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setElections([...elections, { id: Date.now(), ...newElection }])
    setNewElection({ name: '', startDate: '', endDate: '' })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Elections</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Create New Election</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Election Name</Label>
              <Input
                id="name"
                name="name"
                value={newElection.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={newElection.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={newElection.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit">Create Election</Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mt-8">Existing Elections</h2>
      {elections.map((election) => (
        <Card key={election.id}>
          <CardHeader>
            <CardTitle>{election.name}</CardTitle>
            <CardDescription>
              {`Start Date: ${election.startDate} | End Date: ${election.endDate}`}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline">Edit</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}