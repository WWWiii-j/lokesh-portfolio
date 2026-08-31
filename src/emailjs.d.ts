export {}

declare global {
  interface Window {
    emailjs?: {
      send: (
        serviceId: string,
        templateId: string,
        data: Record<string, string>,
        publicKey?: string,
      ) => Promise<unknown>
    }
  }
}
