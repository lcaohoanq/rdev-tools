import { WebContainer } from "@webcontainer/api";

/**
 * WebContainer Singleton Service
 * Ensures only one WebContainer instance is created and shared across the application
 */
class WebContainerService {
  private static instance: WebContainerService | null = null;
  private webContainerInstance: WebContainer | null = null;
  private bootPromise: Promise<WebContainer> | null = null;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  /**
   * Get the singleton instance of WebContainerService
   */
  public static getInstance(): WebContainerService {
    if (!WebContainerService.instance) {
      WebContainerService.instance = new WebContainerService();
    }
    return WebContainerService.instance;
  }

  /**
   * Get or boot the WebContainer instance
   * @returns Promise that resolves to the WebContainer instance
   */
  public async getWebContainer(): Promise<WebContainer> {
    // Return existing instance if already booted
    if (this.webContainerInstance) {
      return this.webContainerInstance;
    }

    // If boot is in progress, wait for it
    if (this.bootPromise) {
      return this.bootPromise;
    }

    // Start booting the WebContainer
    this.bootPromise = WebContainer.boot().then((instance) => {
      this.webContainerInstance = instance;
      return instance;
    });

    return this.bootPromise;
  }

  /**
   * Check if WebContainer is already booted
   */
  public isBooted(): boolean {
    return this.webContainerInstance !== null;
  }

  /**
   * Tear down the WebContainer instance (use with caution)
   */
  public async tearDown(): Promise<void> {
    if (this.webContainerInstance) {
      await this.webContainerInstance.teardown();
      this.webContainerInstance = null;
      this.bootPromise = null;
    }
  }
}

// Export a convenient function to get the WebContainer
export const getWebContainer = async (): Promise<WebContainer> => {
  const service = WebContainerService.getInstance();
  return service.getWebContainer();
};

// Export the service class for advanced usage
export { WebContainerService };
