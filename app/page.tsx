import GridSystem from "@/components/grid-system";

export default function Home() {
  return (
    <div className="container mx-auto px-4 max-w-[1200px]">
      
      <GridSystem />
      <div className="text-3xl text-center mt-10">
        <div>
          This cool color called "<span className="text-up text-4xl">PROFIT</span>"
        </div>
        <div>
          and this cool color called "<span className="text-down text-4xl">LOSE</span>"
        </div>

      </div>
    </div>
  );
}
