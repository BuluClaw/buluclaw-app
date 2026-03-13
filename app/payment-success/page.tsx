import { Suspense } from "react";
import PaymentSuccess from "./payment-success";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Loading...</div>}>
      <PaymentSuccess />
    </Suspense>
  );
}