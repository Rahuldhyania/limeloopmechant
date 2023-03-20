require("isomorphic-fetch");
const Koa = require("koa");
const path = require("path");
const static = require("koa-static");
const mount = require("koa-mount");

const { default: createShopifyAuth } = require("@shopify/koa-shopify-auth");
const { verifyRequest } = require("@shopify/koa-shopify-auth");
const session = require("koa-session");

const dotenv = require("dotenv");
dotenv.config();

const axios = require("axios");

const port = parseInt(process.env.PORT, 10) || 3001;

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, API_URL } = process.env;

buildServer();

async function buildServer() {
  const server = new Koa();
  server.use(session({ httpOnly: false, sameSite: "none", secure: true }, server));
  //server.use(session({ secure: true, sameSite: "none" }, server));
  server.proxy = true;
  server.keys = [SHOPIFY_API_SECRET_KEY];
  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ["read_products", "read_orders"], // TODO: Set correct scopes needed for The Limeloop.
      accessMode: "offline",
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        try {
          ctx.cookies.set("shopOrigin", shop, { httpOnly: false, sameSite: "none", secure: true });
        } catch (e) {
          console.error(e);
        }
        const data = {
           brand: {
             shopify: {
               accessToken: accessToken,
               shopifyDomain: shop
             }
           },
           shopify: true
         }
        await axios.put(`${API_URL}/brand/shopifyBrand/${shop}`, data).then(res => {
          console.log(res);
          ctx.redirect(`https://${shop}/admin/apps/${SHOPIFY_API_KEY}`);
        }).catch(error => {
            console.log(error);
        });
        console.log(shop);
        console.log(accessToken);
      }
    })
  );

  server.use(verifyRequest());

  if (process.env.NODE_ENV === "production") {
    server.use(mount("/", static(__dirname + "/public")));
  } else {
    await webpackMiddleware(server);
  }

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
}

// serve files from webpack, in memory
async function webpackMiddleware(server) {
  const koaWebpack = require("koa-webpack");
  const config = require("./webpack.dev.js");

  const middleware = await koaWebpack({
    config,
    hotClient: false
  });
  server.use(middleware);

  // to access in-memory filesystem provided by html-webpack-plugin
  server.use(async ctx => {
    const filename = path.resolve(config.output.path, "index.html");
    ctx.response.type = "html";
    ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(
      filename
    );
  });
}
