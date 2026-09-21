export function PageIntro({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="container-page pt-14 pb-10 sm:pt-20 sm:pb-12">
      <h1 className="font-display max-w-3xl text-[clamp(2.2rem,5.5vw,3.5rem)] leading-[1.08] font-medium">{title}</h1>
      {intro ? <p className="mt-5 max-w-2xl text-lg text-muted sm:text-xl">{intro}</p> : null}
    </div>
  );
}
