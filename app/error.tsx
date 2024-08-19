"use client";

import { Box, Button, Typography } from "@mui/material";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <Box sx={{ width: "70%", margin: "auto", mt: 6, textAlign: "center" }}>
      <Typography variant="h5">Error</Typography>
      <Typography variant="body1">Something went wrong! {error.message}</Typography>
      <Button variant="text" onClick={() => reset()}>Try again</Button>
    </Box>
  )
}