import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useMemo } from "react";

export function useAccount() {
  const { user, isSignedIn } = useUser();
  const account = useMemo(() => {
    if (isSignedIn && user) {
        const clerkId = user.id;
        const email = user.emailAddresses[0].emailAddress;
        const userFirstName = user.firstName || "User";
        const userLastName = user.lastName || "";
        const fullName = `${userFirstName} ${userLastName}`.trim();
        return {
            clerkId,
            email,
            fullName,
        };
    } else {
        return null;
    }
}, [isSignedIn, user]);
return account;


}