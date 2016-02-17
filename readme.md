Client SDK generator
========

###Setting up:

1.Install swagger-codegen command line tools at https://github.com/swagger-api/swagger-codegen

2.Pull this package down.

3.NPM install.

4.Have your hapi application running.

5.Find the url of your swagger documentation.

5.Run this console command in client_gen directory

	node index.js --l (THE LANGUAGE YOU WANT GENERATED) --url (YOUR URL TO YOUR SWAGGER.JSON)
	
	ex
	
		node index.js --l ruby --url http://localhost:8000/docs?path=v1
		
This command will generate your client lib in the folder called SDK.

<hr>
If you do not have the ability to host your swagger docs(application is not running hapi with swagger) you can add a file into the client_gen application.

1.Add your swagger file to client_gen.

2.Run this console command:

	node index.js --l (THE LANGUAGE YOU WANT GENERATED --f (NAME OF THE FILE)
	
	EXAMPLE:
	
	node index.js --l ruby --f swagger.json
	
<hr>

##Language

	android
	async-scala
	csharp
	dart
	flash
	java
	jaxrs
	inflector
	nodejs
	objc
	perl
	php
	python
	qt5cpp
	ruby
	scala
	scalatra
	silex-PHP
	sinatra
	spring-mvc
	dynamic-html
	html
	swagger
	swagger-yaml
	swift
	tizen
	typescript-angular
	typescript-node
	akka-scala
	CsharpDotNet2
	javascript

###Note if you are trying to generate a npm module use -l javascript to get the class and package file. When doing this it is advised to pass --classname to name the class.
<hr>

###All options that can be passed in:

	--l : The language of client library that you are trying to generate.
	--f : If the file is not hosted online then this is the file path + name.
	--classname : Only used for javascript generation to name the class in the file.
	--url : If your url does not match http://localhost:8000/docs?path=v1 pass in your url to your swagger.json using this.

