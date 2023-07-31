import { HttpLink } from "apollo-link-http";
import {withData} from "next-apollo";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:1337";

const config = {
  //HttpLinkはApollo-link-http
  link: new HttpLink({
    uri: `${API_URL}/graphql`,
  }),
};

//configで設定したサーバーのURL情報をwithDataでわたす
export default withData(config);
