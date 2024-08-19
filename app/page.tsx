import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { Suspense } from "react";
import { CryptoConverterWrapper } from "./ui/CryptoConverterWrapper";

export default async function Home() {

  return (
    <Container component="main" sx={{ mt: 4, mb: 4 }}>
      <Grid rowSpacing={4} justifyContent="center" container>
        <Grid xs={12} item>
          <Typography sx={{ typography: { sm: 'h3', xs: 'h4' } }} align="center" component="h1">Crypto currency converter</Typography>
        </Grid>
        <Suspense fallback={<CircularProgress />}>
          <CryptoConverterWrapper />
        </Suspense>
      </Grid>
    </Container>
  );
}
