---
sidebar_position: 3
---

# Configuration

Initial Cromwell CMS configuration stored in `cmsconfig.json` in a root of a project. 

### Node.js

For example, if you want to connect CMS to your own database, create cmsconfig.json in your project directory root with the following content: 

```json title="cmsconfig.json"
{
  "orm": {
    "type": "mariadb",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "database": "cromwell",
    "password": "your-password"
  }
}
```

The config will be loaded on CMS start with `npx cromwell start`  

### Docker

For a Docker container the config will be a bit different since "localhost" inside a container resolves into container's IP address, not host address. If your database runs in another service of docker-compose under name "db" then use it as "host":  

```json title="cmsconfig.json"
{
  "orm": {
    "type": "mariadb",
    "host": "db",
    "port": 3306,
    "username": "root",
    "database": "cromwell",
    "password": "your-password"
  }
}
```

To load the config into a container we need to change docker-compose.yml.  
Remove all DB_* environment variables and add a volume:

```diff title="diff:docker-compose.yml"
  cromwell:
    image: cromwell:latest
    container_name: cromwell_container
    depends_on:
      - db
    volumes:
+      - ./cmsconfig.json:/app/cmsconfig.json:ro
       - ./nginx:/app/nginx
       - ./public:/app/public
       - ./.cromwell/server:/app/.cromwell/server
       - ./.cromwell/logs:/app/.cromwell/logs
     ports:
       - 80:80
     restart: unless-stopped
-    environment:
-      DB_TYPE: mariadb
-      DB_HOST: db
-      DB_PORT: 3306
-      DB_DATABASE: cromwell
-      DB_USER: cromwell
-      DB_PASSWORD: somepassword

```


## Config options
format: **optionName** `: type` (`defaultValue`) - description.

- ** orm: ** `: ConnectionOptions` - Options passed to TypeORM to create a new connection. [Learn more in TypeORM docs](https://typeorm.io/#/connection-options).
- **apiPort** `: number`  (`4016`)  - Port to use for API and Proxy server. On this port will also be proxied admin panel and Next.js server.
- **adminPanelPort** `: number` (`4064`) - Port to use for admin panel server.
- **frontendPort** `: number` (`4128`) - Port to use for Next.js server.
- **defaultSettings** `: Object` - Default values used to initialize CMS on first launch.
    - **installed** `: boolean` (`false`) - If false, open installation window on admin panel visit until installation finished. Important to note that when there's "installed: false" in DB, all routes will be unprotected by authorization, which means anyone can open admin panel, configure new admin account or make any changes on other pages.
    - **themeName** `: string` (`@cromwell/theme-store`) - NPM package name of an initial theme to use.
    - **logo** `: string` (`/themes/@cromwell/theme-store/shopping-cart.png`) - Path to web site logo in [public](/docs/overview/installation#working-directories) directory
    - **defaultPageSize** `: number` (`15`) - Page size to use by default in categories.
    - **defaultShippingPrice** `: number` - Shipping price to use in standard shipment/delivery method. For now there's only this one method, but you will be able to add more in one of future updates. 
    - **currencies** `: Object[]` - Array of available currencies to use in the store. Currency object has following properties:
        - **id** `: string` - Unique id.
        - **tag** `: string` - Currency code such as "USD".
        - **symbol** `: string` - Symbol, "$".
        - **ratio** `: number` - Ratio between currencies that used to convert prices when a user switches active currency. If, for example, you set "USD" as 1, then "EUR" will have 0.8 value. It also can be as 10 and 8, since CMS only use proportions between numbers, so numbers themselves can have any value. 
        For now Cromwell CMS doesn't update currencies automatically, so you have to update them in the admin panel.


Note that this config is supposed to change general system setting and that cannot be changed at run-time. After edits you need to restart CMS.  

Web-site personalization settings are stored in database and changed in the admin panel at Settings page.
