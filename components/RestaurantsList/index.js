import { Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";
import Link from "next/link";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const query = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

//このpropsはpages/index の<RestaurantList search={query}/>
const RestaurantList = (props) => {
  const { loading, error, data } = useQuery(query);

  if (loading) return <h2>ロード中・・・</h2>;
  if (error) return "レストランの読み込みに失敗しました"
  
    if (data) {
      //data.restaurantsの中にレストランの名前が入ってる
      //restaurantを自分で名前を設定して1つずつチェック

      //includes(props.search)これは、page/indexで<RestaurantList search={query}/>って
      //設定してるからsearchになってる
      //props.searchはsearch={query}をみてて、このqueryは設定したsetQuery(e.target.value.toLocaleLowerCase())
      //検索で打ち込んだ文字列のこと

      const searchQuery = data.restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(props.search)
      );
      return (
        //xs="6" sm="4"はレスポンシブの設定
        <Row>
          {/* restaurantの頭文字resにして1つ1つ取り出す */}
          {searchQuery.map((res) => (
            <Col xs="6" sm="4" key={res.id}>
              <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                {/* この${process.env.NEXT_PUBLIC_API_URL}は、.env.developmentから取ってきたもので
                .NEXT_PUBLIC_API_URLっていうのを設定した
                .envではじまるものは環境変数として使える。そしてlocalhost 1337番を↓で出力*/}
                <CardImg
                  src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`}
                  top={true}
                  style={{ height: 250 }}
                >
                  {/* topプロパティに trueが指定されているため、カードの上部に画像が表示されます。*/}
                </CardImg>
                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  <CardTitle>{res.description}</CardTitle>
                </CardBody>
                <div className="card-footer"></div>
                <Link
                  href={`/restaurants/${res.id}`}
                  as={`/restaurants?id=${res.id}`}
                >
                  <a className="btn btn-primary">もっとみる</a>
                </Link>
              </Card>
            </Col>
          ))}

          <style jsx>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
            `}
          </style>
        </Row>
      );
    } else {
      return <h1>レストランが見つかりませんでした</h1>;
    }
};

export default RestaurantList;
