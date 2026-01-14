import { useBattleStore } from "@/store/BattlesStore";

const LoggerComponent = () => {
  const logsMessages = useBattleStore((state) => state.logs);
  return (
    <div className="w-full p-4 bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg shadow-2xl border-4 border-slate-700">
      <h2 className="text-xl font-bold text-yellow-400 mb-4 text-center font-['Press_Start_2P'] drop-shadow-[2px_2px_0px_#000]">
        BATTLE LOG
      </h2>
      <div className="bg-slate-950 rounded-lg p-4 h-[calc(100vh-200px)] overflow-y-auto border-2 border-slate-600 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-900">
        {logsMessages.length > 0 ? (
          <div className="space-y-2">
            {logsMessages.map((msg, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border-l-4 border-green-500 p-3 rounded-r-lg hover:bg-slate-700/50 transition-all duration-200 animate-fadeIn"
              >
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-bold text-xs mt-1">
                    #{index + 1}
                  </span>
                  <p className="text-gray-200 text-sm leading-relaxed flex-1">
                    {msg}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center font-['Press_Start_2P'] text-xs">
              NO BATTLES YET...
              <br />
              <span className="text-gray-600 text-[10px]">
                Start a battle to see logs!
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoggerComponent;
