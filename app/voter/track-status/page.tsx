'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Mock function to simulate fetching registration status
const fetchRegistrationStatus = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'Pending',
        submissionDate: '2023-06-01',
        estimatedCompletionDate: '2023-06-15',
      })
    }, 1000)
  })
}

export default function TrackRegistrationStatus() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRegistrationStatus().then((data) => {
      setStatus(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Track Registration Status</h1>
      <Card>
        <CardHeader>
          <CardTitle>Registration Status</CardTitle>
          <CardDescription>Current status of your voter registration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Status:</strong> {status.status}</p>
            <p><strong>Submission Date:</strong> {status.submissionDate}</p>
            <p><strong>Estimated Completion Date:</strong> {status.estimatedCompletionDate}</p>
          </div>
          <div className="mt-6">
            <Button>Refresh Status</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}