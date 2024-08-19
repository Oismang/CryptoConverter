import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box sx={{ width: "100%", margin: 6, textAlign: "center" }}>
      <Typography variant="h3">404 Not Found</Typography>
      <Typography variant="subtitle1">Could not find requested resource</Typography>
      <Link href="/">Return Home</Link>
    </Box>
  )
}