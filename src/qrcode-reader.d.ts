declare module 'qrcode-reader' {
    export default class QrCodeReader {
      constructor();
      decode(imageData: ImageData): void;
      callback: (error: any, result: any) => void;
    }
  }
  