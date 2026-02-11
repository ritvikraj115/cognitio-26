
import Waves from "./Waves";

function Hero() {
    return (
        <>

            <div className='absolute top-0 left-0 right-0 h-screen z-0 overflow-hidden pointer-events-none'>
                <Waves
                    lineColor="#14b8a6"
                    backgroundColor="rgba(0, 0, 0, 0.0)"
                    waveSpeedX={0.02}
                    waveSpeedY={0.01}
                    waveAmpX={40}
                    waveAmpY={20}
                    friction={0.9}
                    tension={0.01}
                    maxCursorMove={120}
                    xGap={12}
                    yGap={36}
                />
            </div>

            <div className="relative z-10">
                <div className="absolute -bottom-20 left-0 w-full h-32 bg-gradient-to-b from-[#0b0f14] via-[#0b0f14] to-transparent clip-path-curve" />
            </div>
        </>
    )
}

export default Hero
