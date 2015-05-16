### Pre-requisites

- **CouchDB 1.5 or later**, because of the use of `POST /{db}/_changes`,
- **Node.js**, to load the design documents in the database.

> **Note:**
> 
> - In order to work with WriteOn, our database has to be accessible through HTTPS. We use the hosting service [Couchappy](https://www.couchappy.com/).
> > 
> - We have to be sure to remember to trigger database compaction, or to keep the full history of our documents.


### Enable CORS

Add the following key/value pairs to the CouchDB configuration:

```
[httpd]
enable_cors = true

[cors]
origins = http://localhost, https://writeon.io, https://beta.writeon.io
```


### Create the database

```bash
curl -X PUT https://instance.couchappy.com/documents
```

### Insert the design documents

```bash
curl -O https://raw.githubusercontent.com/BeardandFedora/WriteOn/master/couchdb/setup.js
node setup.js https://instance.couchappy.com/documents
```

Or directly:

```bash
curl https://raw.githubusercontent.com/BeardandFedora/WriteOn/master/couchdb/setup.js | node /dev/stdin https://instance.couchappy.com/documents
```

### Update WriteOn settings

To configure WriteOn to use the CouchDB instance, change the in URL in `Menu` > `Settings` > `Advanced` > `CouchDB URL` to `https://instance.couchappy.com/documents`.


> Written with [WriteOn](https://writeon.io/).