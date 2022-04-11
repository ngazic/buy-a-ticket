import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  public get client(): Stan {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._client;
  }

  connect(clusterID: string, clientID: string, url: string) {
    this._client = nats.connect(clusterID, clientID, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log(`Publisher ${clientID} connected to NATS`);
        resolve();
      });

      this.client.on('error', (err) => {
        reject(err);
      });

    });
  }
}


export const natsWrapper = new NatsWrapper();