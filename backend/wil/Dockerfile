FROM openjdk:17-alpine
ARG JAR_FILE=wil-0.0.1-SNAPSHOT.jar
COPY ./build/libs/${JAR_FILE} wil.jar
ENTRYPOINT ["java","-jar","/wil.jar"]