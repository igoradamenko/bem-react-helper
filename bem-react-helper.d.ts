declare module 'bem-react-helper' {
  type ModValue = string | boolean;

  export type BemProps = {
    mods?: Mods,
    mix?: Mix,
  };
  export type Mix = string | string[];
  export type Mods = Partial<Record<string, ModValue>>;

  export default function b(name: string, props: BemProps, defaultMods?: Mods): string;
}
