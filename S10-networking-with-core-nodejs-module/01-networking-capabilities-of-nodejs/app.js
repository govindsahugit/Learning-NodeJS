import dgram from "node:dgram";
import net from "node:net";
import http from "node:http";
import https from "node:https";
import dns from "node:dns";

import os from "node:os";
const networkInterface = os.networkInterfaces();
console.log(networkInterface);