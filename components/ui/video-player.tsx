"use client";

interface VideoPlayerProps {
  src: string;
  width?: number;
  height?: number;
  onEnded?: () => void;
}

export default function VideoPlayer({
  src,
  height = 384,
  onEnded,
}: VideoPlayerProps) {
  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-lg">
      <video
        src={src}
        controls
        onEnded={onEnded}
        className="w-full h-full"
        style={{ maxHeight: `${height}px` }}
      />
    </div>
  );
}

