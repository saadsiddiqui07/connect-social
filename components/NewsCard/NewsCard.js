import * as React from "react";
import {
  Button,
  CardActionArea,
  CardActions,
  Typography,
  CardMedia,
  CardContent,
  Card,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function NewsCard({
  author,
  title,
  description,
  url,
  source,
  image,
}) {
  if (author === null) return null;
  return (
    <Card className="m-8 lg:m-10 shadow-lg">
      <p className="py-1 px-2 font-semibold text-gray-700 font-mono">
        Source: {source.name}
      </p>
      <CardActionArea>
        <CardMedia
          component="img"
          className="h-30 object-cover w-full"
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="flex mt-auto">
        <Button href={url} size="small" variant="contained" color="primary">
          Show More
        </Button>
      </CardActions>
    </Card>
  );
}
