"use client";

import { useEffect } from "react";

export default function CheckoutPage() {

  useEffect(() => {

    const email =
      localStorage.getItem("user_email");

    window.location.href =
      `https://buy.polar.sh/polar_c_lTh19K9J4McsuNUUQsHw00r21gfTQy5KAkugY1u6Kdo?email=${email}`;

  }, []);

  return null;
}