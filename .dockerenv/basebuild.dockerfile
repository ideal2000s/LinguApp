FROM ruby:2.7.2-alpine
ENV NOKOGIRI_USE_SYSTEM_LIBRARIES=1
RUN apk add --no-cache postgresql-libs libxslt libxml2 tzdata vips imagemagick-libs python2 libcurl \
  && apk add --no-cache --virtual .build-dependencies git imagemagick-dev build-base libxml2-dev libxslt-dev ruby-dev libressl-dev nodejs yarn postgresql-dev \
  && gem install --no-document bundler json \
  && bundle config build.nokogiri --use-system-libraries \
  && bundle config git.allow_insecure true
RUN mkdir -p /app
WORKDIR /app
COPY Gemfile Gemfile.lock package.json yarn.lock ./
COPY gems ./gems
RUN bundle install --without development test && yarn install
