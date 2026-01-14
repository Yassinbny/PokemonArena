import React from "react";

const GameBoyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-full  items-center justify-center bg-gradient-to-br  p-2 font-['Press_Start_2P']">
      <div className="bg-gradient-to-br h-full from-gray-400 to-gray-600 rounded-[20px_20px_60px_20px] p-8 shadow-2xl max-w-2xl w-full">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-5 mb-8 shadow-inner">
          <div className="bg-[#9bbc0f] h-142.5 rounded p-5 shadow-inner text-[#0f380f] relative">
            {children}
          </div>
        </div>{" "}
        <div className="flex justify-between items-center h-10 px-10">
          <div
            className="relative w-20 h-20 bg-gray-800 shadow-[0_4px_0_#1a1a24]"
            style={{
              clipPath:
                "polygon(30% 0%, 70% 0%, 70% 30%, 100% 30%, 100% 70%, 70% 70%, 70% 100%, 30% 100%, 30% 70%, 0% 70%, 0% 30%, 30% 30%)",
            }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-gray-900 rounded-full"></div>
          </div>

          <div className="flex gap-5 items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-[0_4px_0_#4a4a54] flex items-center justify-center text-base text-white/50 font-bold">
              B
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-700 shadow-[0_4px_0_#5c2424] flex items-center justify-center text-base text-white/50 font-bold">
              A
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoyLayout;
