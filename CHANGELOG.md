# Cake

## [v0.1.0]
- [559ee04](https://github.com/dagda1/cake-manager/commit/1a0d7a0aba69cbb7ee2ea3dccab57b34f2568ba5)

- **Breaking:** Remove Java, I hope this does not torpedo the test but I thought I was applying for a javascript role so I was very surprised to see java code :) (I hope)
- Set up yarn workspaces monorepo, typescript, webpack
- Simple express server that returns basic json
- I use webpack to bundle, but grunt is still useful for basic build tasks or else we need to write a lot of bash or node

## [v0.2.0]
- [77381d9](https://github.com/dagda1/cake-manager/commit/77381d9cd7c5764871569b37f30358e8c6db713b)
- Setup sqlite3 db via sequelise-typescript
- setup express routing

## [v0.3.0]
- [b46ffee](https://github.com/dagda1/cake-manager/commit/b46ffee8e4eedd5136728a11bb871c6c484d27bf)
- **Breaking:** Remove all Java files...HOOORAAYYYY

## [v0.4.0]
- [cb469c1](https://github.com/dagda1/cake-manager/commit/cb469c159bcb58205da799159fc5b4ea32ee2d71)
- add universal ssr react code
- This was basically the relevant code copied from my own [monorepo code](https://github.com/dagda1/cuttingedge)
- I hope this is not too much code but react ssr can be tricky to set up and this is my way of doing it
- I have added a few of my own oss packages:
- [@cutting/component-library](https://github.com/dagda1/cuttingedge/tree/master/packages/component-library)
- [@cutting/react-gel](https://github.com/dagda1/cuttingedge/tree/master/packages/react-gel)
- the latter is a responsive grid system and some sass helpers.

## [v0.5.0]
- [2f96a75](https://github.com/dagda1/cake-manager/commit/2f96a7575f7a4f13ff6be7f90028eb2997d7ce78)
- Preload redux store with data on the server.  No need for async call when page loads
- start rendering cakes

## [v0.6.0]
- [23d61af](https://github.com/dagda1/cake-manager/commit/23d61af39c8646a3e2eeaaa8456e3b9cba3af550)
- Ensure only unique cakes are inserted

## [v0.7.0]
- [fe2742c](https://github.com/dagda1/cake-manager/commit/fe2742c7cb1c5e834ff59baaf2ee729691636836****)
- Import and use my own Modal from [@cutting/component-library](https://github.com/dagda1/cuttingedge/blob/master/packages/component-library/src/components/molecules/modal/index.tsx)
- Add [@cutting/connected-components](https://github.com/dagda1/cuttingedge/tree/master/packages/connected-components) which has helpers for redux-form which I will use for adding a cake
- Add it to the main Cakes view

## [v0.8.0]
- [d319441](https://github.com/dagda1/cake-manager/commit/d3194411e6985513f6f0ef30cf118946bfe13637)
- Hookup cakes form using redux-form, ready to post data to API.
## [v0.9.0]
- [04f4f9b](https://github.com/dagda1/cake-manager/commit/04f4f9bb2cba84a6b3e1f7a94aed0d340f039c11)
- install and configure http-proxy-middleware to proxy all non text/html requests to the api

## [v0.10.0]
- [ed9481c](https://github.com/dagda1/cake-manager/commit/ed9481c39e34dcffbc3083ed871d7a74d8fae2c0)
-  Return text response from `/` url.  I am presuming what the first requirement is about when it states 
-  > must be presented in an acceptable format for a human to read
-  The requirements are ambiguous and open to interpretation but this is my understanding
-  Also I am assuming that `A human must be possible for a human to add a new cake to the server` it means a form.
-  Add new `/cakes` POST end point.
-  Hook up the redux-form with the api and call it from the form
-  Configure proxy to redirect `/` and `Accept: application/json` request to `/cakes` redirects to api
-  Style cake component

## [v0.11.0]
- [09a2891](https://github.com/dagda1/cake-manager/commit/09a289192696a7aab159afd3fabc58e141fc0c35)
- Add some basic testing, not the full coverage I would normally do
- Configure app to start api and frontend in root

## [v1.0.0]
- [1e8a847](https://github.com/dagda1/cake-manager/commit/1e8a847516bfa12d459ed5e2de5158c626a38ee6)
- Finish tests and update README
- We are live!!!!!