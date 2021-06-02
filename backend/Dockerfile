FROM openjdk:11-jdk
ARG JAR_FILE=target/*.war
COPY ${JAR_FILE} app.war
ENTRYPOINT ["java","-jar","/app.war"]