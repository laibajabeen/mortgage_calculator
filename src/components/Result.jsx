import illustration from "../assets/images/illustration-empty.svg";
const Result = ({ results }) => {
  const hasResults = results && results.monthlyPayment;
  return (
    <>
      <div
        className="flex flex-col text-center space-y-4 items-center justify-center h-full w-full max-w-screen-lg"
        style={{ backgroundColor: "hsl(202, 55%, 16%)" }}
      >
        {hasResults ? (
          <div className="text-white w-full max-w-md space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-left">
                Your results
              </h2>
              <p className="text-gray-300 text-sm mb-6 text-left">
                Your results are shown below based on the information you
                provided. To adjust the results, edit the form and click
                "calculate repayments" again.
              </p>
            </div>
            <div className="w-full h-1 bg-yellow-400 rounded"></div>

            <div className="mb-8">
              <p className="text-gray-300 text-sm mb-2">
                Your monthly repayments
              </p>
              <p className="text-4xl font-bold text-yellow-400">
                £{results.monthlyPayment}
              </p>
            </div>
            <div className="w-full h-px bg-gray-600 mb-6"></div>
            <div className="mb-4">
              <p className="text-gray-300 text-sm mb-2">
                Total you'll repay over the term
              </p>
              <p className="text-2xl font-bold text-white">
                £{results.totalRepayment}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-white text-center space-y-6 flex flex-col items-center justify-center h-full">
            <img
              src={illustration}
              alt="calculator icon"
              className="w-48 h-48 mx-auto mb-6"
            />
            <div>
              <h3 className="text-white font-bold text-xl mb-4">
                Results shown here
              </h3>
              <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
                Complete the form and click "Calculate Repayments" to see what
                your monthly repayments would be
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Result;
