#!/usr/bin/env node
import 'core-js/stable';
import 'regenerator-runtime/runtime';

/**
 * Module dependencies.
 */
import http from 'http';

import app from '../app';
import Config from '../config/config';
import { connectDB } from '../utils/db';

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(Config.PORT || '3000');
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};
/**
 * Create HTTP server.
 */
const server = http.createServer(app);
/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error(err);
  }

  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
};

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port).on('error', onError).on('listening', onListening);
