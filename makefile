dev:
	npm run dev					
lint:
	npx eslint . # eslinting
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage