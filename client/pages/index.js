import axios from "axios";

const LandingPage = ({ currentUser }) => {
  // axios.get('/api/users/currentuser')

  console.log(currentUser);
  return <h1>Landing page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    try {
      const { data } = await axios.get(
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
        {
          headers: req?.headers || {},
        },
      );

      return data;
    } catch (err) {
      console.log("URL:", err.config?.url);
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);

      return {};
    }
  } else {
    const { data } = await axios.get("/api/users/currentuser");

    return data;
  }
  return {};
};

export default LandingPage;
