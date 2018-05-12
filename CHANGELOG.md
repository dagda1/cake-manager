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
- the latter is a grid system and some sass helpers.

## [v0.5.0]
- [2f96a75](https://github.com/dagda1/cake-manager/commit/2f96a7575f7a4f13ff6be7f90028eb2997d7ce78)
- Preload redux store with data
- start rendering cakes

## [v0.56.0]
- [23d61af](https://github.com/dagda1/cake-manager/commit/23d61af39c8646a3e2eeaaa8456e3b9cba3af550)
- Ensure only unique cakes are inserted