import Result from "./result";
import { useState } from "react";
import Calculator from "./Calculator";

const Card = () => {
  const [results, setResults] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          <div className="lg:w-1/2 p-8">
            <Calculator setResults={setResults} />
          </div>

          <div className="lg:w-1/2">
            <Result results={results} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
