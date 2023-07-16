import "@/styles/globals.css";
import { Footer } from "./Login";
import { Navbar } from "@/Components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
