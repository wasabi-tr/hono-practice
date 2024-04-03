import { Hono } from "hono";
import { html } from "hono/html";

const app = new Hono();

interface SiteData {
  title: string;
  description: string;
  children?: any;
}

const Layout = (props: SiteData) => html`
  <html>
    <head>
      <title>${props.title}</title>
      <meta name="description" content="${props.description}" />
    </head>
    <body>
      ${props.children}
    </body>
  </html>
`;

const Home = (props: { siteData: SiteData; name: string }) => (
  <Layout {...props.siteData}>
    <h1>Hello {props.name}</h1>
  </Layout>
);

app.get("/", (c) => {
  const props = {
    name: "World",
    siteData: {
      title: "Hello! Hono!",
      description: "Hono is cool!",
    },
  };
  return c.html(<Home {...props} />);
});

export default app;
