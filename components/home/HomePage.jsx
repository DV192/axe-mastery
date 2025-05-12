import { useGame } from "@/hooks/useGame"

const HomePage = () => {
  const startGame = useGame(state => state.startGame);

  return (
    <section className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div className="absolute top-4 left-4 md:top-8 md:left-14 opacity-0 animate-fade-in-down animation-delay-200 pointer-events-auto">
        <img
          src="/vercel.svg"
          alt="Logo"
          className="w-20 h-20 object-contain"
        />
      </div>
      <div className="absolute left-4 md:left-15 -translate-x-1/2 -rotate-90 flex items-center gap-4 animation-delay-1500 animate-fade-in-down opacity-0">
        <div className="w-20 h-px bg-white/60"></div>
        <p className="text-white/60 text-xs">Break the curse</p>
      </div>

      <div
        className={`p-4 flex flex-col items-center gap-2 md:gap-4 mt-[50vh] animate-fade-in-up opacity-0 animation-delay-1000`}
      >
        <>
          <h1 className="bold text-white/80 text-4xl md:text-5xl font-extrabold text-center">
            🪓 Training Center
          </h1>
          <p className="text-white/70 text-sm">
            Become an axe master and break the curse of the temple by exploding
            balloons. 🎈 <br />
          </p>
          <button className="bg-white/80 text-black font-bold px-4 py-2 rounded-lg shadow-md hover:bg-white/100 transition duration-200 pointer-events-auto cursor-pointer" onClick={startGame}>
            Start Game
          </button>
        </>
      </div>
    </section>
  )
}

export default HomePage