import { SPECTRUM } from "@/lib/constants";

export function TapeStrip({
  rotation = -1.5,
  className = "",
}: {
  rotation?: number;
  className?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden py-2 ${className}`}>
      <div
        style={{
          background: SPECTRUM,
          height: "4px",
          width: "110%",
          marginLeft: "-5%",
          transform: `rotate(${rotation}deg)`,
        }}
      />
    </div>
  );
}
