type ApiCall<T = any> = () => Promise<T>;

class ApiQueue {
  private queue: (() => Promise<void>)[] = [];
  private running = false;

  enqueue<T>(call: ApiCall<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const wrappedCall = async () => {
        try {
          const result = await call();
          resolve(result);
        } catch (error) {
          console.error("API call in queue failed:");
          reject(error);
        }
      };

      this.queue.push(wrappedCall);
      this.runNext();
    });
  }

  private async runNext() {
    if (this.running || this.queue.length === 0) return;

    this.running = true;
    const call = this.queue.shift();

    try {
      await call?.();
    } finally {
      this.running = false;
      this.runNext();
    }
  }
}

export const apiQueue = new ApiQueue();
