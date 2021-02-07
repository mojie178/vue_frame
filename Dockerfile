FROM hlyharbor.ahggwl.com:9443/base/nginx:v1
RUN rm -rf /usr/share/nginx/html/*
COPY web_ahggwl/ /usr/share/nginx/html/
RUN rm -rf /etc/localtime && ln -snf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo "Asia/Shanghai" > /etc/timezone