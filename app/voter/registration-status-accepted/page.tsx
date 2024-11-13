'use client'



import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { toast } from 'sonner'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'



interface BlockchainData extends Array<string> {

  [index: number]: string;

}



interface RegistrationStatus {

  status: string;

  blockchainData: BlockchainData;

  blockchainAddress: string;

}



export default function RegistrationStatus() {

  const router = useRouter()

  const [status, setStatus] = useState<RegistrationStatus | null>(null)

  const [loading, setLoading] = useState(true)



  useEffect(() => {

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



        if (data.status !== 'accepted') {

          router.push(`/voter/registration-status-${data.status}`)

          return

        }



        setStatus(data)

      } catch (error) {

        toast.error(error instanceof Error ? error.message : 'Failed to fetch status')

      } finally {

        setLoading(false)

      }

    }



    fetchStatus()

  }, [router])



  if (loading) {

    return <div>Loading...</div>

  }



  if (!status) {

    return <div>No status information available</div>

  }



  if (!status.blockchainData) {

    return (

      <div className="max-w-2xl mx-auto">

        <Card>

          <CardHeader>

            <CardTitle>Registration Approved</CardTitle>

            <CardDescription>Your registration is approved but there was an error loading your details</CardDescription>

          </CardHeader>

          <CardContent>

            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">

              <p className="text-yellow-700">Unable to fetch your registration details from the blockchain. Please try refreshing the page.</p>

            </div>

            {status.blockchainAddress && (

              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-4">

                <p className="font-semibold">Blockchain Address:</p>

                <p className="font-mono text-sm mt-1">{status.blockchainAddress}</p>

              </div>

            )}

          </CardContent>

        </Card>

      </div>

    )

  }



  return (

    <div className="max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">Registration Status</h1>

      <Card>

        <CardHeader>

          <CardTitle>Registration Approved!</CardTitle>

          <CardDescription>Your voter registration has been approved</CardDescription>

        </CardHeader>

        <CardContent>

          <div className="space-y-4">

            <div className="bg-green-50 p-4 rounded-md border border-green-200">

              <p className="text-green-700">Your registration has been approved and your information is securely stored on the blockchain.</p>

            </div>

            

            {status.blockchainAddress && (

              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">

                <p className="font-semibold">Blockchain Address:</p>

                <p className="font-mono text-sm mt-1">{status.blockchainAddress}</p>

              </div>

            )}



            <div className="mt-6">

              <h3 className="text-lg font-semibold mb-4">Your Registration Details:</h3>

              <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">

                <div className="sm:col-span-1">

                  <dt className="text-sm font-medium text-gray-500">Full Name</dt>

                  <dd className="mt-1 text-sm text-gray-900">{status.blockchainData[0]}</dd>

                </div>

                <div className="sm:col-span-1">

                  <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>

                  <dd className="mt-1 text-sm text-gray-900">{status.blockchainData[1]}</dd>

                </div>

                <div className="sm:col-span-1">

                  <dt className="text-sm font-medium text-gray-500">Gender</dt>

                  <dd className="mt-1 text-sm text-gray-900">{status.blockchainData[2]}</dd>

                </div>

                <div className="sm:col-span-1">

                  <dt className="text-sm font-medium text-gray-500">Address</dt>

                  <dd className="mt-1 text-sm text-gray-900">{status.blockchainData[3]}</dd>

                </div>

                <div className="sm:col-span-1">

                  <dt className="text-sm font-medium text-gray-500">Phone Number</dt>

                  <dd className="mt-1 text-sm text-gray-900">{status.blockchainData[4]}</dd>

                </div>

                <div className="sm:col-span-1">

                  <dt className="text-sm font-medium text-gray-500">Government ID</dt>

                  <dd className="mt-1 text-sm text-gray-900">{status.blockchainData[5]}</dd>

                </div>

              </dl>

            </div>

          </div>

        </CardContent>

      </Card>

    </div>

  )

}














