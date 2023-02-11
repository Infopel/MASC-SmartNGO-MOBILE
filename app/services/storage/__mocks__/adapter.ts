import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
import migrations from '../migrations';
import {schema} from '../schema';

const adapter = new LokiJSAdapter({
  schema,
  // migrations,
  dbName:'smartngo',
  useWebWorker: false,
  useIncrementalIndexedDB: true,
});

export default adapter;