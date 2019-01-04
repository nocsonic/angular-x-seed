# angular-x-seed
Docker Seed for Angular with Example Login


In app building with [/docker-ng](https://github.com/metal3d/docker-ng/blob/master/README.md)

# generate application named "superhero"
# use "user" option to keep your own uid:gid and be able
# to write in directory.
$ docker run --rm -it --user $(id -u):$(id -g) -e APPNAME=crud-angular7-master -v $PWD/app-repo:/app metal3d/ng
docker run --rm -it  --user $(id -u):$(id -g)  -v $PWD/crud-angular7-master:/app metal3d/ng  -p 4200:4200
