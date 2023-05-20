FROM ruby:2.7.2
ENV NOKOGIRI_USE_SYSTEM_LIBRARIES=1
RUN apt update \
  && apt install --no-install-recommends -y libpq-dev postgresql-client-11 libxslt1.1 libxml2 tzdata git libxml2-dev libxslt1-dev libssl-dev imagemagick
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - \
  && apt install -y nodejs \
  && npm i -g yarn
RUN gem install --no-document bundler json \
  && bundle config build.nokogiri --use-system-libraries \
  && bundle config git.allow_insecure true
RUN mkdir -p /app
WORKDIR /app
