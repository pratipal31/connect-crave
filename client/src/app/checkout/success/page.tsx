import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-green-100 p-4 rounded-full mb-6">
        <Check className="h-16 w-16 text-green-600" />
      </div>

      <h1 className="text-3xl font-bold text-center mb-4">
        Order Placed Successfully!
      </h1>

      <p className="text-gray-600 text-center max-w-md mb-8">
        Thank you for your order. We&apos;ve received your order and will begin
        processing it right away. You&apos;ll receive a confirmation email
        shortly.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/orders">View Your Orders</Link>
        </Button>

        <Button variant="outline" asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
