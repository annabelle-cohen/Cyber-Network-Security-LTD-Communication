# Cyber-Network-Security-LTD-Communication
***Link for more:https://www.youtube.com/watch?v=KIfPEnJycag***

Project that i have created in Cyber Network Security course.
The project presents secure communication between the server and the client by using https and tls 1.2 protocal (one way not two way),
in addition i used salt and hmac for saving the passwords of the user as acceptable.
the frameworks: server:Spring Boot and crudrepository for the dataase, client:react.js mixing of:react redux and react hooks.


The architecture of building the server is basically creating layers by separation into packages , That's how I actually lower the coupling level.
In order to operate the project you must create a self signed certifacte by typing :
"keytool -genkeypair -alias baeldung -keyalg RSA -keysize 4096
-validity 3650 -dname "CN=localhost" -keypass changeit -keystore keystore.p12 storeType PKCS12 -storepass changeit"
at your terminal(terminal of spring or just your cmd)

for using the mail sender you need to create your own key at your email at the option for developers(I will not provide you with mine..sorry :-))

the crudRepository has chosen because it provides protection against attacks like sqli and others.
i also add type of bypass because of the block from the browser because we use self signed certificate(if you use certificate from known athority then you dont need it).
example for xss attack also is apear in client and the solution in the code by comments, but generally react is safe for xss attack.


