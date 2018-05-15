
# Cake Manager Micro Service (Solution)

## Candidate

Paul Cowan [dagda1@scotalt.net](mailto:dagda1@scotalt.net)

## Solution

- I have recorded the blow by blow account of my commits in [CHANGELOG.md](https://github.com/dagda1/cake-manager/blob/master/CHANGELOG.md)
- I have created a [yarn workspace monorepo](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/)
- I have copied a lot of code from my [own monorepo](https://github.com/dagda1/cuttingedge) so there is a lot of boilerplate code for webpack and grunt.  My take away from this is that I need to create more reusable npm packages of my tried and trusted stuff.
- I have ditched the java code and I hope I do not get penalised for that, but this is a javascript role I am applying for and the spec said **refactor or re-write the project anyway you see fit.**.
- Ditching java was an obvious choice :).
- I have used typescript for both api and frontend code.  I <3 typescript.
- I have created my [own express and friends](https://github.com/dagda1/cake-manager/tree/master/packages/api) api node server.
- The [fronted code](https://github.com/dagda1/cake-manager/tree/master/packages/frontend) is a react app which is initially rendered on an express server and not just bundled js code. 
- I've used [express middleware](https://github.com/dagda1/cake-manager/blob/master/packages/frontend/src/index.tsx#L55) to proxy the relevant requests to the api.
- I thought the wording of the requirements were ambiguous and open to interpretation but my understanding is that:
  1. A request to `/` should return `application/text` of the list of cakes.
  2. When it said a human should be able to add a cake.  I have adde a cake in both the api and a form is available at [http://localhost:3000/cakes](http://localhost:3000/cakes).
  3. An html view is available on a browser [http://localhost:3000/cakes](http://localhost:3000/cakes).  The html is responsive and resizes differently at different resolutions.  Clicking on the `Add Cake` button shows a form to add cakes.
  4. A POST to `http://localhost:3000/cakes` will create a cake.
  5. I have deduped the cakes list.

I have used my own OSS projects for certain things:

- [@cutting/react-gel](https://github.com/dagda1/cuttingedge/tree/master/packages/react-gel) - flexbox responsive grid
- [@cutting/component-library](https://github.com/dagda1/cuttingedge/tree/master/packages/connected-components) - atomic design component library
- [@cutting/connected-components](https://github.com/dagda1/cuttingedge/tree/master/packages/connected-components) - reduxy things like redux-form helpers.

## Install

You will need to install [yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) to build the workspace code.

You will need at least yarn@1.5.

You should be running node 9.3 if possible, that is what I am running and I know node-sass will build on that version.

Once yarn is installed, run

```bash
 yarn doitall
```

## Run tests

The tests use jest.  I've not gone overboard with testing but just enough to show I can write js tests.  I've not written any api tests as the ORM really does not leave much to test but in a real app, probably selenium would cover this off.

```bash
 yarn test
```

## Verifying the requirements

If `yarn doitall` has installed and has everything running then:

```bash
 curl http://localhost:3000/
```

Will return a text response of cakes

```bash
 curl localhost:3000/cakes -H "Accept: application/json"
```

Will return a `JSON` list of cakes

Opening a browser a [http://localhost:3000/cakes](http://localhost:3000/cakes) will display a responsive list of cakes that sizes at different resolutions.

Clicking the `ADD CAKE` button will give the user a form with client side validation that allows the user to add a cake via the api.

Executing

```
curl -X POST 'http://localhost:3000/cakes' -H 'Origin: http://localhost:3000' -H 'Content-Type: application/json' -H 'Accept: application/json' --data-binary '{"title":"CAKE","desc":"CAKE","image":"CAKE"}' --compressed
```

Will create a cake on the api.
