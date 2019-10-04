import request from 'request-promise-native';
import * as fxmlp from 'fast-xml-parser';
import * as iconv from 'iconv-lite';
import { MongoClient } from 'mongodb';

const { MONGO_URL, MONGO_PORT, MONGO_DB } = process.env;

const moneyUrl = 'http://www.cbr.ru/scripts/XML_daily.asp';

interface Currency {
  ID: number;
  NumCode: number;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
}

async function processMoney() {
  try {
    const data = await getData();
    if (data) {
      const parcedData = await parceXMLData(data);
      if (parcedData) {
        await updateDataInDB(parcedData);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function getData() {
  return request
    .get({
      method: 'GET',
      uri: moneyUrl,
      encoding: null,
    })
    .catch(err => {
      // Here we can send a message to alert system
      console.log('request is down', err);
    });
}

function parceXMLData(xmlData: string) {
  try {
    const decodedXMLData = iconv.decode(Buffer.from(xmlData), 'win-1251');
    const options = {
      ignoreAttributes: false,
      attributeNamePrefix: '',
      parseNodeValue: false,
    };
    const parcedData = fxmlp.parse(decodedXMLData, options);
    return parcedData.ValCurs.Valute;
  } catch (err) {
    console.log('parceXMLData is down', err);
  }
}

function updateDataInDB(data: Currency[]) {
  const url = `mongodb://${MONGO_URL}:${MONGO_PORT}/`;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const mongoClient = new MongoClient(url, options);
  mongoClient
    .connect()
    .then(client => {
      const UpdatedAt = new Date().getTime();
      const db = client.db(MONGO_DB);
      const col = db.collection('currencies');
      return Promise.all(
        data.map(item =>
          col.updateOne(
            { ID: item.ID },
            { $set: { ...item, UpdatedAt } },
            { upsert: true },
          ),
        ),
      ).then(() => client.close());
    })
    .catch(console.log);
}

processMoney();
