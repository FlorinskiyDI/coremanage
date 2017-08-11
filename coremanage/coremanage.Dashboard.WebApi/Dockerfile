FROM microsoft/aspnetcore-build:1.0-1.1
FROM microsoft/aspnetcore:1.1
ARG source
WORKDIR /app
EXPOSE 80
COPY . /app
ENTRYPOINT ["dotnet", "coremanage.Dashboard.WebApi.dll"]
