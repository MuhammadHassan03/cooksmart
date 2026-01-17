import * as Network from 'expo-network';
import * as SecureStore from 'expo-secure-store';

const QUEUE_KEY = 'offline_api_queue';

class ExpoQueue {
  private isProcessing = false;

  async enqueue<T>(
    call: () => Promise<T>, 
    metadata: { url: string; method: string; data: any }
  ): Promise<T | void> {
    const state = await Network.getNetworkStateAsync();

    if (state.isInternetReachable) {
      try {
        // Internet hai, toh seedha function chalao
        return await call();
      } catch (e) {
        // Agar request fail ho jaye (server error), toh save kar lo
        await this.saveToDisk(metadata);
        throw e;
      }
    } else {
      // Offline: Metadata save karo taake baad mein sync ho sakay
      await this.saveToDisk(metadata);
      console.log("Offline: Request stored for sync.");
      return undefined; // UI level par handle karen ke request queue ho gayi hai
    }
  }

  private async saveToDisk(metadata: any) {
    const raw = await SecureStore.getItemAsync(QUEUE_KEY);
    const queue = raw ? JSON.parse(raw) : [];
    // Duplicate requests se bachne ke liye timestamp add karen
    queue.push({ ...metadata, id: Date.now() });
    await SecureStore.setItemAsync(QUEUE_KEY, JSON.stringify(queue));
  }

  // Sync function mein hum aapka 'api' (axios) instance use karenge
  async sync(apiInstance: any) {
    if (this.isProcessing) return;
    const state = await Network.getNetworkStateAsync();
    if (!state.isInternetReachable) return;

    this.isProcessing = true;
    const raw = await SecureStore.getItemAsync(QUEUE_KEY);
    let queue = raw ? JSON.parse(raw) : [];

    while (queue.length > 0) {
      const item = queue[0];
      try {
        // saved data ko axios ke zariye bhejenge
        await apiInstance({
          url: item.url,
          method: item.method,
          data: item.data
        });
        queue.shift(); // Success: list se nikalo
        await SecureStore.setItemAsync(QUEUE_KEY, JSON.stringify(queue));
      } catch (e) {
        console.log("Sync failed, retrying later...");
        break; 
      }
    }
    this.isProcessing = false;
  }
}

export const apiQueue = new ExpoQueue();