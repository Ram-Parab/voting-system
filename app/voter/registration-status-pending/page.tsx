'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface BlockchainData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  residentialAddress: string;
  phoneNumber: string;
  governmentId: string;
  photoHash: string;
}

interface RegistrationStatus {
  status: string;
  blockchainData: BlockchainData | null;
  submissionDate?: string;
}

export default function TrackRegistrationStatus() {
  const router = useRouter()
  const [status, setStatus] = useState<RegistrationStatus | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchStatus = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Please login first')
        router.push('/voter-login')
        return
      }

      const response = await fetch('http://localhost:5000/api/registration/status', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      setStatus(data)
      
      // Redirect based on status
      switch (data.status) {
        case 'not-registered':
          router.push('/voter/not-registered')
          break
        case 'accepted':
          router.push('/voter/registration-status-accepted')
          break
        case 'rejected':
          router.push('/voter/register')
          break
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch status')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!status) {
    return <div>No status information available</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Track Registration Status</h1>
      <Card>
        <CardHeader>
          <CardTitle>Registration Status: {status.status.toUpperCase()}</CardTitle>
          <CardDescription>Your registration is being reviewed</CardDescription>
        </CardHeader>
        <CardContent>
          {status.blockchainData && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Submitted Information:</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{status.blockchainData.fullName}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                  <dd className="mt-1 text-sm text-gray-900">{status.blockchainData.dateOfBirth}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900">{status.blockchainData.gender}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">{status.blockchainData.residentialAddress}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                  <dd className="mt-1 text-sm text-gray-900">{status.blockchainData.phoneNumber}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Government ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{status.blockchainData.governmentId}</dd>
                </div>
              </dl>
            </div>
          )}
          <div className="mt-6">
            <Button onClick={fetchStatus}>Refresh Status</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}