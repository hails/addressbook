build:
	@docker-compose build

build-no-cache:
	@docker-compose build --no-cache

stop:
	@docker-compose stop

down:
	@docker-compose down

test-database:
	@docker-compose up -d test-database

test-migrate-database:
	@docker-compose run --rm --entrypoint="./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run --config src/config/database.ts" test

test-migrate-database-undo:
	@docker-compose run --rm --entrypoint="./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:revert --config src/config/database.ts" test

test-run:
	@docker-compose up test

test: test-migrate-database test-database test-run

database:
	@docker-compose up -d database

migrate-database:
	@docker-compose run --rm --entrypoint="./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run --config src/config/database.ts" server

migrate-database-undo:
	@docker-compose run --rm --entrypoint="./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:revert --config src/config/database.ts" server

server:
	@docker-compose up server

debug-server:
	@docker-compose up debug-server

run: database migrate-database server

debug: database migrate-database debug-server

.PHONY: build build-no-cache stop down test-database test-migrate-database test-migrate-database-undo test-run test database migrate-database migrate-database-undo server debug-server run debug
