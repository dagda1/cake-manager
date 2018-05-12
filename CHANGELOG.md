# Cake

## [v0.1.0]
- **Breaking:** Remove Java, this is a javascript interview so I was very surprised to see java code :) (I hope)
- Set up yarn workspaces monorepo, typescript, webpack
- Simple express server that returns basic json
- I use webpack to bundle, but grunt is still useful for basic build tasks or else we need to write a lot of bash or node
- [559ee04](https://github.com/dagda1/cake-manager/commit/1a0d7a0aba69cbb7ee2ea3dccab57b34f2568ba5)

## [v0.2.0]
- Setup sqlite3 db via sequelise-typescript
- setup express routing
- [77381d9](https://github.com/dagda1/cake-manager/commit/77381d9cd7c5764871569b37f30358e8c6db713b)

## [v0.3.0]
- **Breaking:** Remove all Java files...HOOORAAYYYY
- [b46ffee](https://github.com/dagda1/cake-manager/commit/b46ffee8e4eedd5136728a11bb871c6c484d27bf)

## [v0.4.0]
- add universal ssr react code
- [cb469c1](https://github.com/dagda1/cake-manager/commit/cb469c159bcb58205da799159fc5b4ea32ee2d71)
- This was basically the relevant code copied from my own [monorepo code](https://github.com/dagda1/cuttingedge)
- I hope this is not too much code but react ssr can be tricky to set up and this is my way of doing it
- I have added a few of my own oss packages:
- [@cutting/component-library](https://github.com/dagda1/cuttingedge/tree/master/packages/component-library)
- [@cutting/react-gel](https://github.com/dagda1/cuttingedge/tree/master/packages/react-gel)
- the latter is a grid system and some sass helpers.