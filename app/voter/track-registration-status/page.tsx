'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Mock function to simulate fetching voter registration status and details
const fetchVoterStatus = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        isRegistered: true,
        isApproved: true,
        voterId: 'V123456789',
        voterDetails: {
          fullName: 'John Doe',
          dateOfBirth: '1990-01-01',
          gender: 'Male',
          address: '123 Main St, Anytown, USA',
          email: 'john.doe@example.com',
          phoneNumber: '+1 (555) 123-4567',
          governmentId: 'G987654321',
        },
      })
    }, 1000)
  })
}

export default function RegistrationStatus() {
  const [voterStatus, setVoterStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVoterStatus().then((data) => {
      setVoterStatus(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Registration Status</h1>
      <Card>
        <CardHeader>
          <CardTitle>Voter Registration Status</CardTitle>
          <CardDescription>Your current registration status and voter details</CardDescription>
        </CardHeader>
        <CardContent>
          {voterStatus.isRegistered ? (
            voterStatus.isApproved ? (
              <div className="space-y-4">
                <p className="text-green-600 font-semibold">Your registration has been approved!</p>
                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="font-bold">Your Voter ID:</p>
                  <p className="text-2xl font-mono mt-2">{voterStatus.voterId}</p>
                </div>
                <p>Please keep this ID safe. You will need it for voting purposes.</p>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Your Registration Details:</h3>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                      <dd className="mt-1 text-sm text-gray-900">{voterStatus.voterDetails.fullName}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                      <dd className="mt-1 text-sm text-gray-900">{voterStatus.voterDetails.dateOfBirth}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Gender</dt>
                      <dd className="mt-1 text-sm text-gray-900">{voterStatus.voterDetails.gender}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Address</dt>
                      <dd className="mt-1 text-sm text-gray-900">{voterStatus.voterDetails.address}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900">{voterStatus.voterDetails.email}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                      <dd className="mt-1 text-sm text-gray-900">{voterStatus.voterDetails.phoneNumber}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Government ID</dt>
                      <dd className="mt-1 text-sm text-gray-900">{voterStatus.voterDetails.governmentId}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            ) : (
              <p>You have already registered. If approved, your voter card and details will be shown here.</p>
            )
          ) : (
            <p>You have not registered yet. Please complete the registration process.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}