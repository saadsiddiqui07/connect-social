import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useStateValue } from "../../context-api/StateProvider";
import { useState } from "react";
import { CardActions } from "@mui/material";

export default function Post({
  username,
  caption,
  id,
  profileImg,
  timestamp,
  image,
}) {
  const [{ user }] = useStateValue();
  const [isLiked, setIsLiked] = useState(false);

  const deletePost = async () => {};

  const showDeleteIcon = user?.displayName === username;

  return (
    <Card className="m-5 w-4/5 ml-auto mr-auto">
      <CardHeader
        avatar={<Avatar src={profileImg} sx={{ bgcolor: red[500] }} />}
        action={
          <IconButton aria-label="settings">
            {showDeleteIcon && <DeleteForeverIcon />}
          </IconButton>
        }
        title={username}
        subheader={new Date(timestamp?.toDate()).toUTCString()}
      />
      <CardMedia
        className="object-contain h-60"
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {caption}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => setIsLiked(!isLiked)}>
          {!isLiked ? (
            <FavoriteBorderIcon />
          ) : (
            <FavoriteIcon className="text-blue-600" />
          )}
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
