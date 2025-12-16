#stage 1

FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

COPY . .

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests


# stage 2

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8090

ENTRYPOINT ["java", "-jar" , "app.jar"]