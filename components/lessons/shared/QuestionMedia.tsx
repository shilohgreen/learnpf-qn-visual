import Image from "next/image";
import VideoPlayer from "@/components/ui/video-player";

type QuestionMediaProps = {
  image_path?: string | null;
  video_path?: string | null;
  className?: string;
};

export default function QuestionMedia({
  image_path,
  video_path,
  className = "",
}: QuestionMediaProps) {
  return (
    <>
      {/* Display image if available */}
      {image_path && (
        <div className="mt-6">
          {image_path.startsWith('data:') ? (
            <img
              src={image_path}
              alt="Diagram related to the question"
              className={className}
            />
          ) : (
            <Image
              src={image_path}
              alt="Diagram related to the question"
              height={10}
              width={600}
              className={className}
            />
          )}
        </div>
      )}

      {/* Display video if available */}
      {video_path && (
        <div className="mt-6">
          <div className="w-full max-w-xl mb-5 px-4 sm:px-0 mt-16 sm:mt-0">
            <VideoPlayer src={video_path} />
          </div>
        </div>
      )}
    </>
  );
}

