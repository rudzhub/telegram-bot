import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class DataService {
  async getOrgData(tableId: string) {
    const auth = new google.auth.JWT(
      'telegram@folderly-app.iam.gserviceaccount.com',
      undefined,
      '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDbhwO5YVSln/o6\ny3EHa9AkXxNot8x1VL81My0gdZPrzgCflF7IrQcGZvJTCjXctoOM8vawuylt7ZFv\nyxo6ALyG+hTtnNSy3Q69WZCaKIPvI8tJxnSPOd3TrtGUG4CJdR/iDus5JJtznAbi\nua6wKOxuuw9vUsH+7s2vXGrvWydw5Pg3s7aoZwo0/spFt4qt2IS5C+YYBp0WFzjp\n/SNBRbJRF+IZIlpYJUdro9lIEu4xzPS84rMlKJbBoHEwrxvgW5iwziGTbw+dMdr9\n55JZSPlzo07eWgOxinEAmalXHsmsesONfQbTtsyKqQ8aKVrACwljsIokCt+hdQK8\n1/wRFBWHAgMBAAECggEAAmYTnKyez9R+Ano8KrhCT6U1bBWeDqYnagv1OGMF2Rdv\n8E50ZcvX/iQG8ZtYLVMdORh/4cq2M7wUCfmuf5Iytg9OKa6DWyMz5UA4EUcpKsnk\nVqglCiFivXdKjkxNTOwZfTLBM3WlRois6+tMmluBAd72gW90notIy9uhqbiOfMWg\nUt13a5KGGu1Sdciof4nQXbcncW82YpWOVAykEDY2K2X3hPoXBYuyjpClC79BRRq4\n+soXtVZ5B0l42aCXdWSQjZnIFImZDceufq7zHL+bp0iKGJUuvvOjX5QdmwdiHic8\np8002ymlry8DeYGGvkW6xAh7YmHX/fNmrntI+vSViQKBgQDuOAFQW1ukb8mDw1t4\nctuqMdqJ/qUxDV4aE/1c6Zj/LljAFd6ahxIPkT8Y0+/Z+NrQV2a9IU80g2la2a5J\nP55ozywze24d5e+UU5vHQvhMp/Q96MSdFfpzfI6imenBDjTVcp0SizOpmoSQ7ADv\nn7X51pSD395IUXEIkEXXzzkjRQKBgQDr6diWoI612FHlE38fi8mHZumbcSCpjgHX\nM6HBWcLOmmBZUvcCZlOl8cvi/WI6lVbDsSqDtC8hBy6T5ra2gtxY7uYV8FGQgNtN\nFrGhfQODSV7ktNu/dGEzxrfdYL3HhdZX8mi3Qmn38Pcsr6/RFPZGA4H/SMebPSqj\nRHR2ylUcWwKBgDJNk0FzuTtU+7meNB+QKYCb/GjtY9ai2v8ov3SyQ0OHduhA9fut\nkAvHgQpuHpTprtMV0bUYZpBRO5saomoHTB0Xul64rr0Tg+7PZPLD2ojdYn78OyBs\ntrFSWRBO7gR9SnzUMgTrbiJfZaTwoRX4pMW4IS5jxJ2CzRqg1I7IzGj9AoGAT+5q\neRarY8eIb+I8NzcIsDzZN9aLp4c67mxLCRTdoVzC+mDW2lRLUTVszFrntku1Gxbi\n/b7GHR2u1WPdUldiSyuef55uNFTEeQkQZFPUJd5tLXZt4h+Pc5iH4ZUOmBSrvB6h\nBj6VYvGc/eIE4wWEL9KucA17vAhscucVws3pKnMCgYA/fzdIOOGDJPLQ0Rd0TBSe\ngvPw79ClVkn6cW75WPaqrE3N1urXSj+BZaxi4Pc55a1Pt1Ep4v66Z8pGPb4lWy/6\nZi/Pb/G+hoNeDJQPCLBJdZnX+3s9Q0p06ReV3kQY0VQQwSBqWQAFxT7EcKJUoavH\n0lhHd94myYTw2BWEVkRfZA==\n-----END PRIVATE KEY-----\n',
      ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    );

    const sheets = google.sheets({ version: 'v4', auth });

    const rows = (
      await sheets.spreadsheets.values.get({
        spreadsheetId: tableId,
        range: 'A2:C',
      })
    ).data.values;

    const data = rows.map((row) => ({
      name: row[0] || '',
      count: row[1] || '',
      description: row[2] || '',
    }));

    return data;
  }
}
