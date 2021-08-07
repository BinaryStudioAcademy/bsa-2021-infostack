/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IButton {
  text: string;
  onClick?(...args: any[]): void
  disabled?: boolean;
}
