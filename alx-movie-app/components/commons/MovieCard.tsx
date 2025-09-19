import { MovieProps } from "@/interfaces";
import Image from "next/image";

const MovieCard: React.FC<MovieProps> = ({ title, posterImage, releaseYear }) => {
  return (
    <div className="aspect-square bg-[#1A1923] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
      {/* Image Section */}
      <div className="relative w-full h-2/3">
        <Image
          src={posterImage}
          alt={title}
          fill
          className="object-cover p-2"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Info Section */}
      <div className="h-1/3 flex flex-col justify-center px-4 py-1">
        <p className="text-md font-semibold truncate">{title}</p>
        <p className="text-sm text-[#E2D609]">{releaseYear}</p>
      </div>
    </div>
  );
};

export default MovieCard;
