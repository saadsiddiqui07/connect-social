import UploadContainer from "../UploadContainer/UploadContainer";
import Posts from "../Posts/Posts";

const Feed = () => {
  return (
    <div className="w-full flex-col lg:w-1/2 flex-col justify-center  ">
      <UploadContainer />
      <div className="posts_containerSm lg:posts__container">
        <Posts />
      </div>
    </div>
  );
};

export default Feed;
