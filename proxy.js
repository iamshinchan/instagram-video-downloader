const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

let port = 2547;
app.use(cors());

app.get('/proxy', (req, res) => {
    const fileUrl = req.query.url; // Get the URL from the query parameter
    const fileName = req.query.fileName; // Extract the filename from the URL
    console.log(fileUrl)
    axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
    })
        .then((response) => {
            res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
            res.setHeader('Content-type', response.headers['content-type']);
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

            response.data.pipe(res);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Server error');
        });
});

app.use('/graphql/query', createProxyMiddleware({
    target: 'https://www.instagram.com',
    changeOrigin: true,
    pathRewrite: {
        '^/graphql/query': '/graphql/query/'
    },
    headers: {
        'Referer': 'https://www.instagram.com/'
    }
}));

app.listen(port, () => console.log(`Proxy server listening on port ${port}!`));

module.exports = { app }