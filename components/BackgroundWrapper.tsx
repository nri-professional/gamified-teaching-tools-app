type BackgroundWrapperProps = {
  children: React.ReactNode;
};

export default function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  return (
    <div className="relative min-h-full w-full overflow-hidden">
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-md brightness-75"
        style={{ backgroundSize:"200%",
          backgroundImage:
            "url('https://images2.alphacoders.com/717/thumb-1920-717870.jpg')",
        }}
      />

      {/* Soft dark overlay (optional) */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Foreground */}
      <div className="relative z-10 flex items-center justify-center h-full p-6 md:p-10">
        {children}
      </div>
    </div>
  );
}