import { Routing } from "pages/Routing/Routing";
import "./index.css";
import { withProviders } from "./providers/with-providers";

function App() {
  return <Routing />;
}

const WithProviders = withProviders(App);

export { WithProviders as App };
