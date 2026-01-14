import GameBoyLayout from "@/layouts/GameBoyLayout";
import GameBoyContent from "@/components/GameBoyContent/GameBoyContent";
import LoggerComponent from "@/components/LoggerComponent/LoggerComponent";

const BattlePage = () => {
  return (
    <div className="flex flex-row h-full">
      <GameBoyLayout>
        <GameBoyContent />
      </GameBoyLayout>
      <LoggerComponent />
    </div>
  );
};

export default BattlePage;
