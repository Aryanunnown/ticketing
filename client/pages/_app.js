import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

function App({ Component, pageProps, currentUser }) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
}

App.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  try {
    const { data } = await client.get("/api/users/currentuser");
  } catch (error) {
    console.log("URL:", error.config?.url);
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    return {};
  }

  // invoke get initial props on pages with getInitialProps
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser,
    );
  }
  return {
    pageProps,
    ...data,
  };
};

export default App;
