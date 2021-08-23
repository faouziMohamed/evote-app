#!/usr/bin/env node
/* eslint-disable no-console */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import address from 'address';
import chalk from 'chalk';
/**
 * Module dependencies.
 */
import http from 'http';

import app from '../app';
import Config, { debug } from '../config/config';
import { connectDB } from '../config/db';

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
const port = normalizePort(Config.PORT || '5000');
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
      debug(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug(`${bind} is already in use`);
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
    debug(err);
  }

  const addr = server.address();
  // const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  const localUrl = `http://localhost:${chalk.bold(addr.port)}`;
  const ipv4Url = `http://${address.ip()}:${chalk.bold(addr.port)}`;
  const msg = `You can now view ${chalk.bold(Config.APP_NAME)} in the browser.`;
  console.log('>', msg);
  console.log();
  console.log(`    ${chalk.bold('Local:')}           ${localUrl}`);
  console.log(`    ${chalk.bold('On Your network:')} ${ipv4Url}`);
  console.log();
};

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port).on('error', onError).on('listening', onListening);
