dev:
	npm run dev					
lint:
	npx eslint . # eslinting
test:
	DEBUG=game NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage