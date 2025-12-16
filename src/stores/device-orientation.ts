import { Store } from '../classes/Store';

export type DeviceOrientationStoreValue = DeviceOrientationEvent | undefined;

const deviceOrientationStore = new Store<DeviceOrientationStoreValue>(undefined);

export default deviceOrientationStore;
