# CompareETTask
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.3.

## Install dependencies
Run `npm istall` for `node_modules` file

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma]

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Build and run docker container
### Added Dockerfile and nginx.conf files 
Build: `docker build -t compare_ET`
Run: `docker run -d -p 8080:80 compare_ET`