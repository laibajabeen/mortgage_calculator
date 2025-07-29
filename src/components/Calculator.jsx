import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { any, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import cal from "../assets/images/icon-calculator.svg";
const schema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => parseFloat(val) > 0, {
      message: "Amount must be greater than 0",
    }),
  term: z.string().min(1, "Term is required"),

  interestRate: z
    .string()
    .min(1, "Interest rate is required")
    .refine((val) => parseFloat(val) > 0, {
      message: "Term must be greater than 0",
    }),
  mortgageType: z.enum(["Repayment", "InterestOnly"], {
    message: "Mortgage type is required",
  }),
});
const Calculator = ({ setResults }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: "",
      term: "",
      interestRate: "",
      mortgageType: "",
    },
  });
  const clearbutton = () => {
    reset();
    setResults(null);
  };

  const onSubmit = (data) => {
    const principal = parseFloat(data.amount);
    const years = parseFloat(data.term);
    const rate = parseFloat(data.interestRate) / 100 / 12;

    const n = years * 12;

    let monthlyPayment = 0;

    if (data.mortgageType === "InterestOnly") {
      monthlyPayment = principal * rate;
    } else if (data.mortgageType === "Repayment") {
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
        <form onSubmit={handleSubmit(onSubmit)} className="w-full p-4">
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
              {...register("amount")}
              className="w-full border border-gray-300 outline-none rounded py-3 pl-10 pr-4 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />
          </div>

          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
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
                  {...register("term")}
                  className="w-full border border-gray-300 outline-none rounded py-3 pl-6 pr-4 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                />
              </div>
            </div>

            {errors.term && (
              <p className="text-red-500 text-sm mt-1">{errors.term.message}</p>
            )}
            <div>
              <label htmlFor="" className="text-left block my-2">
                Interest Rate
              </label>
              <div className="relative">
                <span className="absolute flex items-center right-0 top-1/2 transform -translate-y-1/2 text-gray-500 block bg-slate-100 h-full font-semibold px-2 py-1">
                  %
                </span>

                <input
                  step="any"
                  {...register("interestRate")}
                  id="interestRate"
                  type="number"
                  className="w-full border border-gray-300 outline-none rounded py-3 pl-6 pr-4 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                />
              </div>
            </div>

            {errors.interestRate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.interestRate.message}
              </p>
            )}
          </div>
          <br />
          <div className="text-left">
            <label className="my-5" htmlFor="">
              Mortgage Type
            </label>
            <br />
            <div className="w-auto border border-black-300 outline-none rounded py-2 px-3">
              <input
                {...register("mortgageType")}
                type="radio"
                id="repayment"
                name="mortgageType"
                value="Repayment"
                className="mr-2 accent-yellow-400 w-4 h-4"
              />
              <label htmlFor="">Repayment</label>
            </div>
            <br />
            <div className="border w-auto rounded py-2 px-3">
              <input
                id="interestOnly"
                type="radio"
                {...register("mortgageType")}
                name="mortgageType"
                value="InterestOnly"
                className="mr-2 accent-yellow-400 w-4 h-4"
              />
              <label htmlFor="">Interest Only</label>
            </div>

            {errors.mortgageType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mortgageType.message}
              </p>
            )}
            <br />
            <button
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
