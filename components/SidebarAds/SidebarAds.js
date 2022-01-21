import Image from "next/image";
import { Button } from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";

const SidebarAds = () => {
  return (
    <div className="hidden flex-1 lg:inline cursor-pointer bg-white p-2 rounded shadow-lg ml-5 mr-6 mb-auto">
      <div>
        <Image
          src="https://ppcprotect.com/static/2462efe5633121a7b298d08f21e8f5da/ga-worth-it-thumbnail.jpg"
          height={500}
          width={400}
          objectFit="contain"
        />
      </div>
      <Button
        className="text-white ml-auto bg-gradient-to-r from-blue-500 to-blue-500 hover:from-green-400 hover:to-blue-500"
        color="inherit"
        variant="contained"
        endIcon={<CampaignIcon />}
      >
        Post an ad
      </Button>
    </div>
  );
};

export default SidebarAds;
