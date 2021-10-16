import {useEffect} from "react";
import {useRouter} from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(()=>{
    function pageViewHandler(url) {
      gtag('config', 'G-BQMVH6HDSR', {
        page_path: url
      } );
    }
    router.events.on( 'routeChangeComplete', pageViewHandler );
    return () => {
      router.events.off( 'routeChangeComplete', pageViewHandler );
    }
  },[router]);
  useEffect(() => {
    window.IMP.init("imp04225663");
  },[])
  return <Component {...pageProps} />;
}

export default MyApp
