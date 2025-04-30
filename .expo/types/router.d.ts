/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/camara`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/emociones`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/principal`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/camara`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/emociones`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/principal`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/tabs/camara${`?${string}` | `#${string}` | ''}` | `/tabs/emociones${`?${string}` | `#${string}` | ''}` | `/tabs/principal${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/camara`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/emociones`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/principal`; params?: Router.UnknownInputParams; };
    }
  }
}
