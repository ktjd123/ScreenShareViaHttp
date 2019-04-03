// const express = require('express');
import express from 'express';

import bodyParser from 'body-parser';
import next from 'next';

import compression from 'compression';
import morgan from 'morgan';
import api from './routes';

const server = express();

const dev = process.env.NODE_ENV === 'development';
const app = next({ dev });
const defaultRequestHandler = app.getRequestHandler();

const LOCAL_DB = 'theseed';
const SESSION_KEY = 'connect.sid';
const SESSION_SECRET = 'jfoiesofj@#JIFSIOfsjieo@320923';
const SESSION_DOMAIN = undefined;
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/${LOCAL_DB}`;
const PORT = process.env.PORT || 80;

app.prepare().then(() => {
  // Parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: false }));
  // Parse application/json
  server.use(bodyParser.json());

  // Theseed Custom
  server.use(compression());
  server.use(morgan('dev'));

  // API routes
  server.use('/api', api);

  // Next.js request handling
  const customRequestHandler = (page, req, res) => {
    // Both query and params will be available in getInitialProps({query})
    const mergedQuery = Object.assign({}, req.query, req.params);
    app.render(req, res, page, mergedQuery);
  };

  // Routes
  // server.get('/', customRequestHandler.bind(undefined, '/'));
  server.get('/about/:id', customRequestHandler.bind(undefined, '/about'));
  server.get('*', defaultRequestHandler);

  server.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json({ code: 0 });
  });

  server.listen(PORT, () => {
    console.log(
      `App running on http://localhost:${PORT}/\nAPI running on http://localhost:${PORT}/api/`,
    );
    console.log(
      '웹 브라우져에서 이 PC의 IP를 입력하고 프레젠테이션을 시작하세요 [ipconfig, ifconfig를 통해 확인]',
    );
  });
});
