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
    name: 'Priya Patel',
    email: 'priya@example.com',
    status: 'Pending',
    dateOfBirth: '1990-01-15',
    gender: 'Female',
    address: '42/B, Shanti Nagar, Mumbai, Maharashtra - 400001',
    phoneNumber: '9876543210',
    governmentId: '4567 8901 2345'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    status: 'Approved',
    dateOfBirth: '1985-05-20',
    gender: 'Male',
    address: '15, MG Road, Bangalore, Karnataka - 560001',
    phoneNumber: '8765432109',
    governmentId: '7890 1234 5678'
  },
  {
    id: 3,
    name: 'Amit Singh',
    email: 'amit@example.com',
    status: 'Rejected',
    dateOfBirth: '1992-11-05',
    gender: 'Male',
    address: '78/C, Civil Lines, New Delhi - 110001',
    phoneNumber: '7654321098',
    governmentId: '2345 6789 0123'
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    email: 'sneha@example.com',
    status: 'Pending',
    dateOfBirth: '1998-02-12',
    gender: 'Female',
    address: '23, Anna Salai, Chennai, Tamil Nadu - 600002',
    phoneNumber: '9765432108',
    governmentId: '8901 2345 6789'
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


