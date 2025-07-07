import React, { useState } from "react";
import { Modal, IconButton, Box, Backdrop, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const Certificate = ({ ImgSertif }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ width: "100%" }}>
      
      {/* Thumbnail with Hover Overlay */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: 3,
          cursor: "pointer",
          "&:hover .overlay": { opacity: 1 },
          "&:hover .hover-content": { transform: "translate(-50%, -50%)", opacity: 1 },
          "&:hover .certificate-img": { filter: "contrast(1.05) brightness(1) saturate(1.1)" }
        }}
      >
        <img
          src={ImgSertif}
          alt="Certificate"
          loading="lazy"
          className="certificate-img"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "cover",
            filter: "contrast(1.1) brightness(0.9) saturate(1.1)",
            transition: "filter 0.3s ease"
          }}
          onClick={() => setOpen(true)}
        />

        {/* Hover Overlay */}
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(2px)",
            opacity: 0,
            transition: "opacity 0.3s ease"
          }}
          onClick={() => setOpen(true)}
        >
          <Box
            className="hover-content"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -60%)",
              opacity: 0,
              color: "white",
              textAlign: "center",
              transition: "all 0.4s ease"
            }}
          >
            <FullscreenIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" fontWeight={600}>View Certificate</Typography>
          </Box>
        </Box>
      </Box>

      {/* Fullscreen Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          sx: { backgroundColor: "rgba(0, 0, 0, 0.9)", backdropFilter: "blur(5px)" }
        }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh", outline: "none" }}>
          
          {/* Close Button */}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
              bgcolor: "rgba(0,0,0,0.6)",
              zIndex: 1,
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)", transform: "scale(1.1)" }
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Full Image */}
          <img
            src={ImgSertif}
            alt="Full Certificate"
            style={{
              display: "block",
              maxWidth: "100%",
              maxHeight: "90vh",
              margin: "0 auto",
              objectFit: "contain"
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Certificate;
