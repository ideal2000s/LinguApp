FROM ruby:2.7.2-alpine
ENV RAILS_LOG_TO_STDOUT=true
ENV RAILS_ENV=production
ENV NOKOGIRI_USE_SYSTEM_LIBRARIES=1
RUN apk add --no-cache postgresql-libs libxslt libxml2 tzdata nodejs vips file imagemagick libcurl
RUN mkdir -p /app
WORKDIR /app
