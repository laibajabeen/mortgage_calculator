import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import cal from "../assets/images/icon-calculator.svg";
const Calculator = ({ setResults }) => {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [mortgageType, setMortgageType] = useState("");
  const clearbutton = (e) => {
    e.preventDefault();
    setAmount("");
    setTerm("");
    setInterestRate("");
    setMortgageType("");
    setResults(null);
  };

  const calculateRepayment = (e) => {
    e.preventDefault();
    if (!amount || !term || !interestRate || !mortgageType) {
      toast.error("Please fill in all fields");
      return;
    }
    const principal = parseFloat(amount);
    const years = parseFloat(term);
    const rate = parseFloat(interestRate) / 100 / 12;

    const n = years * 12;

    let monthlyPayment = 0;

    if (mortgageType === "InterestOnly") {
      monthlyPayment = principal * rate;
    } else if (mortgageType === "Repayment") {
      monthlyPayment =
        (principal * (rate * Math.pow(1 + rate, n))) /
        (Math.pow(1 + rate, n) - 1);
    }

    const totalRepayment = monthlyPayment * n;
    const totalInterest = totalRepayment - principal;
    const calculationresults = {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalRepayment: totalRepayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    };
    setResults(calculationresults);
  };
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          error: {
            style: {
              background: "#EF4444",
            },
          },
        }}
      />
      <div className="h-full w-full ">
        <form onSubmit={calculateRepayment} className="w-full p-4">
          <div className="flex justify-between  items-center mb-4">
            <h1 className="text-3xl text-left font-semibold mb-4 mt-4">
              Mortgage Calculator
            </h1>
            <button
              type="button"
              onClick={clearbutton}
              className="text-gray-500 text-sm mb-4 underline py-2 px-3"
            >
              Clear All
            </button>
          </div>

          <label htmlFor="" className="text-left block my-2">
            Mortgage Amount
          </label>
          <div className="relative">
            <span className="absolute left-0 bg-slate-100 flex items-center h-full top-1/2 transform px-3 py-2 -translate-y-1/2 text-gray-500 font-semibold">
              £
            </span>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 outline-none rounded py-3 pl-10 pr-4 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />
          </div>
          <div className="flex justify-between border-box gap-4">
            <div>
              <label htmlFor="" className="text-left block my-2">
                Mortagage Term
              </label>
              <div className="relative">
                <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 h-full flex items-center font-semibold bg-slate-100 px-3 py-1">
                  Years
                </span>
                <input
                  id="term"
                  type="number"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="w-full border border-gray-300 outline-none rounded py-3 pl-6 pr-4 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                />
              </div>
            </div>
            <div>
              <label htmlFor="" className="text-left block my-2">
                Interest Rate
              </label>
              <div className="relative">
                <span className="absolute flex items-center right-0 top-1/2 transform -translate-y-1/2 text-gray-500 block bg-slate-100 h-full font-semibold px-2 py-1">
                  %
                </span>
                <input
                  id="interestRate"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full border border-gray-300 outline-none rounded py-3 pl-6 pr-4 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                />
              </div>
            </div>
          </div>
          <br />
          <div className="text-left">
            <label className="my-5" htmlFor="">
              Mortgage Type
            </label>
            <br />
            <div className="w-auto border border-black-300 outline-none rounded py-2 px-3">
              <input
                type="radio"
                value="Repayment"
                id="repayment"
                name="mortgageType"
                onChange={(e) => setMortgageType(e.target.value)}
                checked={mortgageType === "Repayment"}
                className="mr-2 accent-yellow-400 w-4 h-4"
              />
              <label htmlFor="">Repayment</label>
            </div>
            <br />
            <div className="border w-auto rounded py-2 px-3">
              <input
                id="interestOnly"
                type="radio"
                value="InterestOnly"
                name="mortgageType"
                onChange={(e) => setMortgageType(e.target.value)}
                checked={mortgageType === "InterestOnly"}
                className="mr-2 accent-yellow-400 w-4 h-4"
              />
              <label htmlFor="">Interest Only</label>
            </div>
            <br />
            <button
              onClick={calculateRepayment}
              type="submit"
              className="border  flex justify-center items-center rounded-full py-2 m-4 block px-3"
              style={{ backgroundColor: "#d9da31", color: "white" }}
            >
              <img src={cal} alt="" className="mx-3" />
              Calculate Repayments
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Calculator;
