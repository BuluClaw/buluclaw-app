"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {

  const router = useRouter();

  useEffect(() => {

    const checkSubscription = async () => {

      const res = await fetch("/api/check-subscription");
      const data = await res.json();

      if(!data.active){
        router.push("/checkout");
      }

    };

    checkSubscription();

  },[]);

  return (

    <div className="text-white p-10">

      <h1 className="text-3xl">
        Dashboard
      </h1>

      <p className="mt-4">
        Welcome to BuluClaw
      </p>

    </div>

  );

}