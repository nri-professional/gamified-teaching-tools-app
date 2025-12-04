export function SiteFooter() {
  return (
    <footer className="px-4 pb-6 pt-4 text-foreground">
      <div className="mx-auto flex w-full max-w-6xl justify-center">
        <div className="animate-footer relative inline-flex max-w-full flex-col items-center overflow-hidden rounded-2xl border border-primary/30 bg-[#0c1b12]/85 px-6 py-4 text-center backdrop-blur-xl supports-[backdrop-filter]:bg-[#0c1b12]/75">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-4 right-4 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
            <div className="absolute -right-10 top-1 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(189,237,145,0.2),transparent_65%)] blur-2xl" />
            <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(239,195,125,0.22),transparent_60%)] blur-2xl" />
          </div>

          <div className="relative flex flex-col items-center gap-1">
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-primary">
              Crafted with ✨ by Team GPT
            </p>
            <p className="text-[0.65rem] text-muted-foreground">
              Keep questing, keep learning.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
