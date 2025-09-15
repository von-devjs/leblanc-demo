
import { useRef } from "react";

interface ScreenOrientationWithLock extends ScreenOrientation {
  lock?: (orientation: "landscape" | "portrait") => Promise<void>;
}

function App() {
  const videoId = "jCam_vJhnQc"; // Replace with your YouTube video ID
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  // Handle custom fullscreen + landscape
  const handleFullscreen = async () => {
    if (videoContainerRef.current) {
      try {
        // Request fullscreen for the video container
        if (videoContainerRef.current.requestFullscreen) {
          await videoContainerRef.current.requestFullscreen();
        }

        // Cast with extended type
        const orientation = screen.orientation as ScreenOrientationWithLock;

        if (orientation.lock) {
          try {
            await orientation.lock("landscape");
          } catch (err) {
            console.warn("Orientation lock failed:", err);
          }
        }
      } catch (err) {
        console.error("Fullscreen request failed:", err);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4">
      {/* Video Container */}
      <div
        ref={videoContainerRef}
        className="relative w-full max-w-4xl aspect-video mt-5"
      >
        <iframe
          className="w-full h-full rounded-xl shadow-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />

        {/* Custom Fullscreen Button */}
        <button
          onClick={handleFullscreen}
          className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-md hover:bg-black/80 transition"
        >
      
        </button>
      </div>
    </div>
  );
}

export default App;
