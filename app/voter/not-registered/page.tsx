import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotRegistered() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Not Registered</CardTitle>
          <CardDescription>You have not registered to vote yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            To participate in elections, you need to register as a voter. Registration is quick and easy.
          </p>
        </CardContent>
        <CardFooter>
          <Link href="/voter/register" passHref>
            <Button className="w-full">Register to Vote</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}