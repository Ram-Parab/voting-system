'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const mockVoters = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    status: 'Pending',
    dateOfBirth: '1990-01-15',
    gender: 'Female',
    address: '123 Main St, Springfield',
    phoneNumber: '123-456-7890',
    governmentId: 'ID123456',
    photo: '/path/to/photo1.jpg'
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    status: 'Approved',
    dateOfBirth: '1985-05-20',
    gender: 'Male',
    address: '456 Elm St, Metropolis',
    phoneNumber: '987-654-3210',
    governmentId: 'ID789012',
    photo: '/path/to/photo2.jpg'
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    status: 'Rejected',
    dateOfBirth: '1992-11-05',
    gender: 'Other',
    address: '789 Maple Ave, Gotham',
    phoneNumber: '555-123-4567',
    governmentId: 'ID345678',
    photo: '/path/to/photo3.jpg'
  },
  {
    id: 4,
    name: 'Diana Ross',
    email: 'diana@example.com',
    status: 'Pending',
    dateOfBirth: '1998-02-12',
    gender: 'Female',
    address: '321 Oak St, Smallville',
    phoneNumber: '222-333-4444',
    governmentId: 'ID901234',
    photo: '/path/to/photo4.jpg'
  }
]

export default function ManageVoters() {
  const [voters, setVoters] = useState(mockVoters)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [expandedVoterId, setExpandedVoterId] = useState<number | null>(null)

  const handleStatusChange = (voterId: number, newStatus: string) => {
    setVoters(voters.map(voter => 
      voter.id === voterId ? { ...voter, status: newStatus } : voter
    ))
  }

  const toggleDetails = (voterId: number) => {
    setExpandedVoterId(prevId => prevId === voterId ? null : voterId)
  }

  const filteredVoters = voters.filter(voter => {
    const matchesSearchTerm =
      voter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || voter.status.toLowerCase() === filter.toLowerCase()
    return matchesSearchTerm && matchesFilter
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Voters</h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search voters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center space-x-4">
          <label htmlFor="filter">Filter by status:</label>
          <Select
            value={filter}
            onValueChange={(value) => setFilter(value)}
          >
            <SelectTrigger id="filter">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
              {expandedVoterId === voter.id && (
                <div className="mt-4 p-4 border-t border-gray-200 max-h-40 overflow-y-auto">
                  <p><strong>Date of Birth:</strong> {voter.dateOfBirth}</p>
                  <p><strong>Gender:</strong> {voter.gender}</p>
                  <p><strong>Address:</strong> {voter.address}</p>
                  <p><strong>Phone Number:</strong> {voter.phoneNumber}</p>
                  <p><strong>Government ID:</strong> {voter.governmentId}</p>
                  {voter.photo && (
                    <div className="mt-2">
                      <strong>Photo:</strong>
                      <img src={voter.photo} alt={`${voter.name}'s Photo`} className="mt-1 max-w-xs h-auto border rounded" />
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => toggleDetails(voter.id)}>
                {expandedVoterId === voter.id ? 'Hide Details' : 'View Details'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
