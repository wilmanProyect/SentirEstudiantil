/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/resultado`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/camara` | `/camara`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/emociones` | `/emociones`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/principal` | `/principal`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/resultado`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/camara` | `/camara`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/emociones` | `/emociones`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/principal` | `/principal`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/resultado${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/camara${`?${string}` | `#${string}` | ''}` | `/camara${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/emociones${`?${string}` | `#${string}` | ''}` | `/emociones${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/principal${`?${string}` | `#${string}` | ''}` | `/principal${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/resultado`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/camara` | `/camara`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/emociones` | `/emociones`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/principal` | `/principal`; params?: Router.UnknownInputParams; };
    }
  }
}
