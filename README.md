# angular-x-seed
Docker Seed for Angular with Example Login


In app building with [/docker-ng](https://github.com/metal3d/docker-ng/blob/master/README.md)

# generate application named "superhero"
# use "user" option to keep your own uid:gid and be able
# to write in directory.
$ docker run --rm -it --user $(id -u):$(id -g) -e APPNAME=crud-angular7-master -v $PWD/app-repo:/app metal3d/ng
docker run --rm -it  --user $(id -u):$(id -g)  -v $PWD/crud-angular7-master:/app metal3d/ng  -p 4200:4200




http://www.gistia.com/authentication-in-angular-with-ngrx-part-ii/

https://github.com/ngrx/platform/blob/e6048bdab9198f75932631a3822767bbaabed54b/projects/example-app/src/app/books/reducers/books.reducer.ts

https://github.com/thomasdtucker/a7-product-management
https://github.com/tomastrajan/angular-ngrx-material-starter
https://blog.thoughtram.io/angular/2017/05/23/custom-themes-with-angular-material.html

https://stackoverflow.com/questions/49519261/angular-5-nested-form-and-validation-and-property-controls-does-not-exist-on-t
