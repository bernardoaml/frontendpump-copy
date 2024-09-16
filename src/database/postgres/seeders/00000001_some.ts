import 'dotenv/config';

// import {getDB} from '@db';

// import {sysCodes} from '@db/sys-codes';

export const data = [
  {
    code: 354,
    category: 'eventMedia',
    name: 'gallery',
  },
];

// const db = getDB(true);

async function main() {
  // await db.insert(sysCodes).values(data);

  process.exit();
}

main();
