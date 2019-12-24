########## TEST ENVIROMENT
FROM node:8.11.1 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /usr/src/app
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker build -t clripley.azurecr.io/ripley.pay.core:20190823-QA .
# docker run -it clripley.azurecr.io/ripley.pay.core:20190823-QA
# docker push clripley.azurecr.io/ripley.pay.core:20190823-QA
