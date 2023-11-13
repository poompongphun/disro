"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import User from "@/Class/User";
import axios from "@/utils/axios";
import { Button } from "@mui/material";

const Premium = () => {
  const { data: session } = useSession();
  const user = session?.user as User;
  console.log(user);
  const [hasPremium, setHasPremium] = useState(false);
  const [premiumEnd, setPremiumEnd] = useState("");
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost/payment-service/checkPremium/" + user._id)
        .then(async (res) => {
          if (res.data) {
            await axios
              .get(
                "http://localhost/payment-service/getPremiumCoverage/" +
                  user._id
              )
              .then((res) => {
                setPremiumEnd(res.data);
                setHasPremium(true);
              });
          }
        });
    };
    getData();
  });

  const pay = async () => {
    await axios
      .post(
        "http://localhost/payment-service/payPremium",
        {
          description: "Pay for Premium",
          orderItem: "Premium",
          userId: user._id,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        window.open(res.data, "_blank");
      });
  };

  return (
    <div className="flex h-screen flex-col w-full ">
      <div className="flex justify-between p-10">
        <div className="text-4xl">Premium</div>
      </div>

      <div className="flex justify-between px-32 py-10">
        <div className="text-xl">
          {hasPremium
            ? "You have premium until " +
              new Intl.DateTimeFormat("en-GB", {
                dateStyle: "full",
                timeStyle: "long",
              }).format(new Date(premiumEnd))
            : "You do not have premium."}
        </div>
      </div>

      <div className="flex justify-between px-32 py-10">
        <Button onClick={pay}>Buy premium for 1 month</Button>
      </div>
    </div>
  );
};
export default Premium;
