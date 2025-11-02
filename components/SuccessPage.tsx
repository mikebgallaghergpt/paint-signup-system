// Step 1: Create a SuccessPage component in src/components/SuccessPage.tsx
import { Link } from 'react-router-dom';

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-4">✅ Thank You!</h1>
      <p className="text-lg mb-6">Your submission has been received. We’ll be in touch soon.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
      >
        Return to Signup
      </Link>
    </div>
  );
}