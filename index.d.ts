declare module 'bem-react-helper' {
  type ModValue = string | boolean | number;

  export type Mix = string | string[];
  export type Mods = Partial<Record<string, ModValue>>;

  export default function b<T extends Mods>(name: string, props?: { mods?: T, mix?: Mix }, defaultMods?: Partial<T>): string;
}
