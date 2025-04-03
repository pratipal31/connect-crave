import { Suspense } from "react";
import SignUpForm from "../../components/auth/SignupForm";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Suspense fallback={<div>Loading...</div>}>
        <SignUpForm />
      </Suspense>
    </main>
  );
}
