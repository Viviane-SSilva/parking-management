const { PrismaClient } = require('@prisma/client');

const cliente = new PrismaClient();

module.exports = cliente;