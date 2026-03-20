# init

Date: 2026.03.20

```shell
# check
npm list -g @angular/cli
# install
npm install -g @angular/cli
ng version

# Needs     --style=scss --skip-tests=true --routing=true
# Defaults  --strict=true --ssr=true --standalone=true

ng new NgOxu --style=scss --skip-tests=true --routing=true --strict=true --ssr=true --standalone=true

```

```text
--routing		boolean				Enable routing in the initial project.
--skip-tests	boolean false		Do not generate "spec.ts" test files for the new project. 								
--style	css | scss | sass | less	The file extension or preprocessor to use for style files.

--strict		boolean	true		Creates a workspace with stricter type checking and stricter bundle budgets settings.	
--standalone	boolean	true		Creates an application based upon the standalone API, without NgModules.
--ssr			boolean				Creates an application with Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering) enabled.

--no-standalone
```

## angular.json

```json
 {
  "styles": [
    "node_modules/@fortawesome/fontawesome-free/css/all.css",
    "node_modules/@qrsln/lootstrap/dist/css/lootstrap.css",
    "src/styles.scss"
  ],
  "scripts": [
    "node_modules/@fortawesome/fontawesome-free/js/all.min.js"
  ]
}
```

##  

```shell

```