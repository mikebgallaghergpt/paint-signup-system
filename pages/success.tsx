import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-md w-full shadow-xl">
        <CardContent className="py-10 px-6 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Thank you for signing up!</h1>
          <p className="text-gray-600 mb-6">
            We've received your submission. A welcome email has been sent to your inbox.
          </p>

          <Link href="/classes">
            <Button className="w-full">Explore Our Classes</Button>
          </Link>

          <p className="mt-6 text-sm text-gray-500">
            Didn't receive the email? Check your spam folder or <Link href="/contact" className="underline text-blue-600">contact us</Link>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}