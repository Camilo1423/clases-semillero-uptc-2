const CardAgent = ({ img, nameCharacter, description }) => {
  return (
    <div className="group relative flex animate-card-in flex-col border border-line bg-surface transition-[translate,background-color] duration-350 ease-valorant [clip-path:polygon(0_0,calc(100%-18px)_0,100%_18px,100%_100%,0_100%)] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-350 after:ease-valorant hover:-translate-y-1.5 hover:bg-bg-elevated hover:after:scale-x-100">
      <div className="relative aspect-square overflow-hidden bg-[radial-gradient(circle_at_50%_60%,rgba(255,70,85,0.35),transparent_65%),linear-gradient(180deg,#24384a_0%,var(--color-surface)_100%)] before:absolute before:inset-0 before:bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] before:bg-size-[24px_24px] before:mask-b-from-30%">
        <img
          src={img}
          alt="personaje-${nameCharacter}-valorant"
          className="relative block size-full object-contain p-[12%] drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-valorant group-hover:scale-106"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-5 pt-5 pb-6">
        <h2 className="font-display text-[30px] leading-none font-normal tracking-[0.02em] text-text uppercase">
          {nameCharacter}
        </h2>
        <p className="line-clamp-4 text-sm leading-[1.6] font-normal text-text-muted">
          {description}
        </p>
        <button className="mt-auto h-11 w-full cursor-pointer rounded-[4px] border border-accent bg-transparent font-body text-[13px] font-semibold tracking-[0.14em] text-accent uppercase transition-[background-color,color,scale] duration-200 hover:bg-accent hover:text-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text active:scale-97">
          Like this agent
        </button>
      </div>
    </div>
  );
};

export { CardAgent };
