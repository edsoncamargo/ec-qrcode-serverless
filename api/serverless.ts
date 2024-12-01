import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

import QRCode from 'qrcode';
import { db } from './lib/firebase';

const app = Fastify({
  logger: true,
});

app.get('/', async (_, res) => {
  return res.status(200).type('text/html').send('Running api...');
});

app.get(
  '/qrcode/:id',
  async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const redirectToUrl = `/redirect/${id}`;

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
  }
);

app.get(
  '/redirect/:id',
  async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const docRef = doc(db, 'redirects', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const redirectToUrl = docSnap.data().redirect;
      reply.redirect(redirectToUrl);
      return;
    }

    reply.status(404).send('Redirect not found.');
  }
);

export default async function handler(req: any, res: any) {
  await app.ready();
  app.server.emit('request', req, res);
}
