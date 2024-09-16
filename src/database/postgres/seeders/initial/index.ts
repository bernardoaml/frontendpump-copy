import 'dotenv/config';

import {getDB} from '@db';

import {
  // accountAirdrops,
  // accountAirdropTasks,
  accounts,
  airdrops,
  airdropTasks,
  coins,
  meta,
  sysCodes,
  targets,
} from '@db/_schema';

import {sysCodesData} from './00_sys-codes';
import {accountsData} from './01_accounts';
import {coinsData} from './02_coins';
import {metaData} from './03_meta';
import {targetsData} from './04_targets';
import {airdropsData} from './05_airdrops';
import {airdropTasksData} from './06_airdrop-tasks';
// import {accountAirDropsData} from './07_account-airdrops';
// import {accountAirdropTasksData} from './08_account-airdrop-tasks';

const saveLocal = true;
const db = getDB(saveLocal);

async function main() {
  await db.insert(sysCodes).values(sysCodesData);
  await db.insert(accounts).values(accountsData);
  await db.insert(coins).values(coinsData);
  await db.insert(meta).values(metaData);
  await db.insert(targets).values(targetsData);
  await db.insert(airdrops).values(airdropsData);
  await db.insert(airdropTasks).values(airdropTasksData);
  // await db.insert(accountAirdrops).values(accountAirDropsData);
  // await db.insert(accountAirdropTasks).values(accountAirdropTasksData);

  process.exit();
}

main();
