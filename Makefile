all:

CONTAINER_NAME = client-ui-container
DEV_IMAGE_NAME = local/image-client-ui-dev


build-clean:
	rm -rf node_modules
	rm -rf dist

clean: build-clean

build-dev:
	docker build -t $(DEV_IMAGE_NAME) -f Dockerfile.dev .



run-container:
	docker run --name $(CONTAINER_NAME) -d -p 4200:4200  $(DEV_IMAGE_NAME)

start:
	docker start $(CONTAINER_NAME)

stop:
	docker stop $(CONTAINER_NAME)

rm:
	docker rm $(CONTAINER_NAME)

flush:
	docker stop $(CONTAINER_NAME) && docker rm $(CONTAINER_NAME)

rm-image:
	docker rmi  $(DEV_IMAGE_NAME)

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker logs -f  $(CONTAINER_NAME)

ssh-exec:
	docker exec -it $(CONTAINER_NAME) sh
