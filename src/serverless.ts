import Fastify, { FastifyReply, FastifyRequest } from 'fastify';

import QRCode from 'qrcode';

const app = Fastify({
  logger: true,
});

app.get('/', async (req, res) => {
  return res.status(200).type('text/html').send('Running api 🚀');
});

app.get('/qrcode', async (request: FastifyRequest, reply: FastifyReply) => {
  const redirectToUrl = '/api/redirect';

  try {
    const qrCodeImage = await QRCode.toDataURL(
      `${request.protocol}://${request.hostname}${redirectToUrl}`
    );

    return reply.header('Content-Type', 'text/html').send(`
          <html>
            <body style="width: 100%; height: 100%; display: 
                flex; flex-direction: column; justify-content: center; align-items: center; overflow: hidden;">
              <img src="${qrCodeImage}" alt="QR Code" style="width: 15%" />
            </body>
          </html>
        `);
  } catch (error) {
    reply.status(500).send(error);
  }
});

app.get('/redirect', async (_, reply: FastifyReply) => {
  const redirectToUrl = 'https://nosso-tempo-juntos-beta.vercel.app/';
  reply.redirect(redirectToUrl);
});

export default async function handler(req: any, res: any) {
  await app.ready();
  app.server.emit('request', req, res);
}
