check: lint test

lint:
	./node_modules/.bin/jshint *.js lib test/*.js

test:
	./node_modules/.bin/mocha --recursive --require should test/*.js

.PHONY: check lint test
