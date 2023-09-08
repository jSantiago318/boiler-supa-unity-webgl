import "./index.css";

import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect, useState } from "react";

import { Auth } from "@supabase/auth-ui-react";
import {Overlay} from "./components/Overlay";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [session, setSession] = useState(null);

  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );

  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "./assets/Builds.loader.js",
    dataUrl: "./assets/Builds.data.br",
    frameworkUrl: "./assets/Builds.framework.js.br",
    codeUrl: "./assets/Builds.wasm.br",
  });
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

       // A function which will update the device pixel ratio of the Unity
      // Application to match the device pixel ratio of the browser.
      const updateDevicePixelRatio = function () {
        setDevicePixelRatio(window.devicePixelRatio);
      };
      // A media matcher which watches for changes in the device pixel ratio.
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio}dppx)`
      );
      // Adding an event listener to the media matcher which will update the
      // device pixel ratio of the Unity Application when the device pixel
      // ratio changes.
      mediaMatcher.addEventListener("change", updateDevicePixelRatio);
      return function () {
        // Removing the event listener when the component unmounts.
        mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
      };

    return () => subscription.unsubscribe();
  }, [devicePixelRatio]);
  const loadingPercentage = Math.round(loadingProgression * 100);
  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return (
    <>
        {isLoaded === false && (
        // We'll conditionally render the loading overlay if the Unity
        // Application is not loaded.
        <div className="loading-overlay">
          <p>Loading... ({loadingPercentage}%)</p>
        </div>
      )}
      
        <Overlay/>
      <Unity
        unityProvider={unityProvider}
        devicePixelRatio={devicePixelRatio}
        style={{ visibility: isLoaded ? "visible" : "hidden", width: "100%", height: "100%", top: "0", left: "0", position: "absolute" }}
      />
    </>

        
    );
  }
}
