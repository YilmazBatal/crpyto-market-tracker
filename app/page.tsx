import GridSystem from "@/components/grid-system";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-gradient via-background to-transparent" />
      <div className="container mx-auto px-4 max-w-[1200px] relative">
      <GridSystem />
        <div className="text-3xl text-center mt-10">
          <p>
            This cool color called "<span className="text-up text-4xl">PROFIT</span>"
          </p>
          <p>
            and this cool color called "<span className="text-down text-4xl">LOSE</span>"
          </p>
        </div>
      </div>
    </div>
  );
}

