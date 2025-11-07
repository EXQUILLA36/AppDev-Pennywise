import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useUser } from "@clerk/clerk-react";
import { useGSAP } from "@gsap/react";
import { useAccount } from "../utils/account";
import { addUserToFirestore } from "../utils/firebaseUser";
import { getUserFromFirestore } from "../firebase/getUSer";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import gsap from "gsap";

export default function Dashboard() {
  const navigate = useNavigate();
  const account = useAccount();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const modal = useRef(null);
  // *WALLET
  const [walletContent, setWalletContent] = useState({});

  //* Add user to Firestore on account change
  useEffect(() => {
    async function processAccount() {
      try {
        if (account) {
          console.log("🟢 Adding user to Firestore:", account);
          const status = await addUserToFirestore(account);
          if (status === "accountProccessed") {
            console.log("🟢 Fetching user data from Firestore");
            fetchUserData();
          }
        } else {
          console.log("🔴 No account yet");
        }

        const userRef = doc(db, "users", account.clerkId);

        const unsubscribe = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setWalletContent(data.wallet);
            console.log("🔁 Firestore updated:", data);
          } else {
            console.warn("⚠️ User document does not exist yet!");
          }
        });

        // Cleanup when component unmounts or account changes
        return () => unsubscribe();
      } catch (err) {
        console.error("❌ Error processing account:", err);
      } finally {
        setLoading(false);
      }
    }

    processAccount();

    async function fetchUserData() {
      if (account) {
        const data = await getUserFromFirestore(account.clerkId);
        setUserData(data);
        setWalletContent(data.wallet);
      }
    }
  }, [account]);

  console.log("User Data from Firestore:", userData);
  console.log("Wallet Content:", walletContent);

  useGSAP(() => {
    gsap.from(".dashboard-header", {
      x: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.inOut",
    });
    gsap.from(".dashboard-item", {
      y: 50,
      opacity: 0,
      duration: 2,
      stagger: 0.2,
      ease: "power4.inOut",
    });
    gsap.from(".dashboard-item2", {
      opacity: 0,
      duration: 0.7,
      stagger: 0.2,
      ease: "power4.inOut",
    });
  }, []);

  return (
    <div className="flex flex-col gap-10 p-5">
      <section className="w-full flex flex-row justify-between">
        <section className="leading-tight overflow-hidden">
          <h1 className="dashboard-header montserrat-bold text-white">
            Dashboard
          </h1>
          <h2 className="dashboard-header">
            {userData
              ? `Welcome ${userData.full_name}! Here's your financial overview`
              : "Welcome! Here's your financial overview"}
          </h2>
        </section>
        <Dialog>
          <DialogTrigger className="bg-orange-500 h-fit py-[0.8rem] px-[2vw] rounded-2xl montserrat-bold emboss hover:scale-103 hover:bg-orange-400 duration-300 cursor-pointer">
            Manage Balance
          </DialogTrigger>
          <DialogContent className="bg-[#191919] border border-white/10 rounded-2xl shadow-lg shadow-black/30">
            <DialogHeader>
              <DialogTitle className={"typo-sub"}>Manage you balance</DialogTitle>
              <DialogDescription className={"typo-par"}>
                Add or edit your wallet balance and transactions.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-row gap-2">
              <Select>
                <SelectTrigger className="w-[40%]">
                  <SelectValue placeholder="Transaction" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Income">Income</SelectItem>
                  <SelectItem value="Expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              <input type="text" placeholder="Amount" className="w-full px-[1vw] border border-white/10 rounded-md" />
            </div>
          </DialogContent>
        </Dialog>
      </section>

      <section className="flex flex-row gap-[1vw] justify-between">
        <div className="dashboard-item flex flex-col w-full h-fit p-[1.5vw] gap-3 bg-[#191919] rounded-xl emboss">
          <div className="flex flex-row justify-between items-center">
            <span className="montserrat-bold typo-sub">Total Balance</span>
            <img src="./images/icons/dashboardIcons/wallet.svg" alt="" />
          </div>
          <div className="dashboard-item flex flex-col">
            <h1 className="poppins-bold typo-subheader">
              ₱ {walletContent.total_balance}
            </h1>
            <span className="text-amber-600">+12.5% from last month</span>
          </div>
        </div>
        <div className="dashboard-item flex flex-col w-full h-fit p-[1.5vw] gap-3 bg-[#191919] rounded-xl emboss">
          <div className="flex flex-row justify-between items-center">
            <span className="montserrat-bold typo-sub">Income</span>
            <img
              src="./images/icons/dashboardIcons/arrow-up-right.svg"
              alt=""
            />
          </div>
          <div className="dashboard-item flex flex-col">
            <h1 className="poppins-bold typo-subheader">
              ₱ {walletContent.total_income}
            </h1>
            <span className="text-amber-600">+12.5% from last month</span>
          </div>
        </div>
        <div className="dashboard-item flex flex-col w-full h-fit p-[1.5vw] gap-3 bg-[#191919] rounded-xl emboss">
          <div className="flex flex-row justify-between items-center">
            <span className="montserrat-bold typo-sub">Expenses</span>
            <img
              src="./images/icons/dashboardIcons/arrow-down-right.svg"
              alt=""
            />
          </div>
          <div className="dashboard-item flex flex-col">
            <h1 className="poppins-bold typo-subheader">
              ₱ {walletContent.total_expenses}
            </h1>
            <span className="text-amber-600">+12.5% from last month</span>
          </div>
        </div>
        <div className="dashboard-item flex flex-col w-full h-fit p-[1.5vw] gap-3 bg-[#191919] rounded-xl emboss">
          <div className="flex flex-row justify-between items-center">
            <span className="montserrat-bold typo-sub">Savings</span>
            <img src="./images/icons/dashboardIcons/trending-up.svg" alt="" />
          </div>
          <div className="dashboard-item flex flex-col">
            <h1 className="poppins-bold typo-subheader">
              ₱ {walletContent.total_savings}
            </h1>
            <span className="text-amber-600">+12.5% from last month</span>
          </div>
        </div>
      </section>

      <section className="flex flex-row gap-10 justify-between">
        <section className="dashboard-item2 flex flex-col gap-3 w-full h-[25vw] p-[1vw] bg-[#191919] rounded-xl emboss">
          <h1>Recent Transactions</h1>
          <div className="flex flex-col gap-2 w-full h-[90vw] overflow-y-auto">
            <div className="flex flex-row justify-between montserrat-bold w-full h-fit p-2">
              <div className="flex flex-col leading-tight">
                <h2 className="typo-sub">Grocery</h2>
                <span className="montserrat-medium">today</span>
              </div>
              <div className="flex flex-col text-right leading-tight">
                <h2 className="typo-sub">-$125</h2>
                <span className="montserrat-medium">food</span>
              </div>
            </div>
          </div>
          <button className="bg-[#191919] p-[0.5vw] rounded-sm emboss">
            View Transactions
          </button>
        </section>

        <section className="dashboard-item2 flex flex-col gap-3 w-full h-[25vw] p-[1vw] bg-[#191919] rounded-xl emboss">
          <h1>Budget Overview</h1>
          <div className="flex flex-col w-full h-[90vw] overflow-y-auto">
            <div className="flex flex-row justify-between montserrat-bold w-full h-fit p-2">
              <div className="flex flex-row items-center justify-between w-full leading-tight">
                <h2 className="typo-sub">Grocery</h2>
                <span className="montserrat-medium">$400 / $600</span>
              </div>
            </div>
            <div className="w-full h-[0.5rem] bg-orange-400 rounded-full"></div>
          </div>
          <button className="bg-[#191919] p-[0.5vw] rounded-sm emboss">
            View Transactions
          </button>
        </section>
      </section>

      {/* <dialog
        ref={modal}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl backdrop:bg-black/80 backdrop-blur-3xl"
      >
        <div className="w-[30vw] h-full p-[1vw] text-white bg-[#191919] rounded-xl flex flex-col gap-4 items-center justify-center">
          <div className="w-full h-fit flex flex-col gap-2">
            <h1 className="typo-subhead montserrat-bold">Update Wallet</h1>
            <div class="w-full h-[1px] bg-white/20 my-4"></div>
          </div>

          <div className="flex flex-col gap- w-full h-full items-center justify-center">
            <form action="" className="w-full">
              <div className="w-full flex flex-row">
                <input
                  type="text"
                  placeholder="Amount"
                  className="w-full p-1 rounded-lg border"
                />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </form>
          </div>
          <button
            onClick={() => setOpenModal(false)}
            className="bg-orange-500 py-2 px-5 text-white rounded-lg hover:bg-orange-400 duration-300"
          >
            Close
          </button>
        </div>
      </dialog> */}
    </div>
  );
}
