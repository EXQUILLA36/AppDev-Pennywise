import React, { useState, useEffect, useRef } from "react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function transactions() {
  const modal = useRef(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    console.log("Modal state changed:", openModal);
    const openModel = () => {
      if (openModal) {
        modal.current.showModal();
      } else {
        modal.current.close();
      }
    };
    openModel();
  }, [openModal]);

  useGSAP(() => {
    gsap.from(".dashboard-header", {
      x: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.inOut",
    });
    // gsap.from(".dashboard-item", {
    //   y: 50,
    //   opacity: 0,
    //   duration: 0.7,
    //   stagger: 0.2,
    //   ease: "power4.inOut",
    // });
    // gsap.from(".dashboard-item2", {
    //   opacity: 0,
    //   duration: 0.7,
    //   stagger: 0.2,
    //   ease: "power4.inOut",
    // });
  }, []);
  return (
    <div className="flex flex-col gap-10 p-5">
      <section className="w-full flex flex-row justify-between">
        <section className="leading-tight overflow-hidden">
          <h1 className="dashboard-header montserrat-bold text-white">
            Transactions
          </h1>
          <h2 className="dashboard-header">
            Track and manage all you financial transactions
          </h2>
        </section>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-orange-500 h-fit py-[0.8rem] px-[2vw] rounded-2xl montserrat-bold emboss hover:scale-103 hover:bg-orange-400 duration-300 cursor-pointer"
        >
          Add Transaction
        </button>
      </section>

      <section className="dashboard-item2 flex flex-col gap-3 w-full h-[37vw] p-[1vw] bg-[#191919] rounded-xl emboss">
        <div className="flex flex-row justify-between items-center pb-3 border-b border-gray-700">
            <form action="">
                <input type="text" />
            </form>
        </div>
      </section>

      <dialog
        ref={modal}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl backdrop:bg-black/50"
      >
        <div className="w-full h-full bg-white rounded-xl flex flex-col gap-4 items-center justify-center">
          <h1 className="text-xl font-bold">Hi</h1>
          <button
            onClick={() => setOpenModal(false)}
            className="bg-orange-500 py-2 px-5 text-white rounded-lg hover:bg-orange-400 duration-300"
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
}
