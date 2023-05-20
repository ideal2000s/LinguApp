FROM ruby:2.7.2-alpine
RUN apk --no-cache --virtual .ruby-gemdeps add libc-dev gcc g++ libxml2-dev libxslt-dev make chromium chromium-chromedriver postgresql-client postgresql-dev git nodejs tzdata vips file imagemagick
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/
ENV MALLOC_ARENA_MAX=2
