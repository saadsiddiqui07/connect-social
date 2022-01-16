import { truncateText } from "../../utils/truncateText";

const NewsCard = ({ author, title, description, url, image }) => {
  if (!author) return null;
  return (
    <div className="flex flex-col items-center shadow-lg rounded-2xl mx-4 my-10 hover:bg-gray-100 hover:shadow-2xl">
      <img src={image} alt="News" className="h-[150px] object-cover w-[100%]" />
      <div className="flex flex-col w-full p-2 ">
        <small className="text-gray-500 underline font-mono font-bold">
          Published by: {author}
        </small>
        <a
          href={url}
          className="font-medium cursor-pointer hover:underline hover:text-blue-500"
        >
          {title}
        </a>
        <span className="text-sm font-mono mt-2">
          {truncateText(description, 100)}
        </span>
      </div>
    </div>
  );
};

export default NewsCard;
