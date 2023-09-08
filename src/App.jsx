import './index.css'

import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect, useState } from 'react'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://xtvhlyzslloupdyylgby.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0dmhseXpzbGxvdXBkeXlsZ2J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQxMzExMTQsImV4cCI6MjAwOTcwNzExNH0.uPNwhXYlFil0nYqmun7If_bn_qDuiW1TSYL9LNN_m0E')

export default function App() {
  const [session, setSession] = useState(null)
  const { unityProvider } = useUnityContext({
    loaderUrl: "../public/Builds.loader.js",
    dataUrl: "../public/Builds.data.br",
    frameworkUrl: "../public/Builds.framework.js.br",
    codeUrl: "../public/Builds.wasm.br",
  });
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    return (<Unity unityProvider={unityProvider} />)
  }
}